import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, CheckCircle, Clock, XCircle, Mail, Database, Terminal, User, Copy, Check, Calendar } from 'lucide-react';
import { supabaseService, isSupabaseConfigured } from '../lib/supabase';
import { useBooking } from '../context/BookingContext';

export const Admin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedSql, setCopiedSql] = useState(false);
  const { showToast } = useBooking();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await supabaseService.getBookingInquiries();
      setInquiries(data || []);

      const savedEmails = JSON.parse(localStorage.getItem('auria_newsletter') || '[]');
      setNewsletters(savedEmails);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await supabaseService.updateInquiryStatus(id, newStatus);
      showToast(`Status updated to ${newStatus.toUpperCase()}`, 'success');
      fetchDashboardData();
    } catch (err) {
      console.error('Error updating status:', err);
      showToast('Error updating status.', 'error');
    }
  };

  const filteredInquiries = statusFilter === 'ALL'
    ? inquiries
    : inquiries.filter((inq) => inq.status?.toLowerCase() === statusFilter.toLowerCase());

  const handleCopySqlNotice = () => {
    setCopiedSql(true);
    showToast('SQL reference copied!', 'success');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="pt-28 pb-28 space-y-12 bg-sand min-h-screen">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-6 space-y-4">
        <div className="flex items-center space-x-2 font-mono text-xs text-brass uppercase tracking-widest">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-charcoal">Management Dashboard</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display italic text-4xl md:text-5xl text-charcoal">
              Reservation Inquiries & Supabase Control
            </h1>
            <p className="font-sans text-xs text-charcoal-muted mt-1">
              Review guest stay inquiries and update booking statuses in real time.
            </p>
          </div>

          <button
            onClick={fetchDashboardData}
            className="px-4 py-2.5 bg-white hover:bg-brass hover:text-sand-light border border-stone-border font-mono text-xs text-charcoal uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Supabase</span>
          </button>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-panel border border-stone-border p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white">
          
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSupabaseConfigured ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30' : 'bg-brass/10 text-brass border border-brass/30'}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-charcoal-light uppercase tracking-widest block">Supabase Connection State</span>
              <span className="font-mono text-xs font-bold text-charcoal">
                {isSupabaseConfigured ? 'LIVE SUPABASE POSTGRESQL' : 'STANDALONE LOCAL MODE'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brass/10 text-brass border border-brass/30 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-charcoal-light uppercase tracking-widest block">Recorded Inquiries</span>
              <span className="font-mono text-xs font-bold text-brass">
                {inquiries.length} INQUIRIES
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brass/10 text-brass border border-brass/30 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-charcoal-light uppercase tracking-widest block">Journal Subscribers</span>
              <span className="font-mono text-xs font-bold text-charcoal">
                {newsletters.length} SUBSCRIBERS
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Inquiries Table */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-stone-border shadow-sm">
          <div className="font-mono text-xs font-bold text-charcoal uppercase tracking-widest">
            Guest Inquiries ({filteredInquiries.length})
          </div>

          <div className="flex space-x-2 font-mono text-[11px] uppercase">
            {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 border transition-all ${
                  statusFilter === st
                    ? 'bg-brass text-sand-light border-brass font-bold'
                    : 'bg-sand text-charcoal-muted border-stone-border hover:text-charcoal'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-border overflow-x-auto shadow-card-light">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-border bg-sand font-mono text-[10px] text-brass uppercase tracking-widest">
                <th className="p-4">Guest Info</th>
                <th className="p-4">Dates & Occupants</th>
                <th className="p-4">Suite / Request</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border font-sans text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-charcoal-muted">
                    Fetching data from Supabase...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-charcoal-muted">
                    No inquiries under "{statusFilter}" status.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-sand/60 transition-colors">
                    
                    <td className="p-4 space-y-1">
                      <div className="font-bold text-charcoal flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-brass" />
                        <span>{inq.guest_name}</span>
                      </div>
                      <div className="font-mono text-[10px] text-charcoal-muted">{inq.email}</div>
                      {inq.phone && <div className="font-mono text-[10px] text-charcoal-light">{inq.phone}</div>}
                    </td>

                    <td className="p-4 font-mono text-[11px] text-charcoal space-y-1">
                      <div><span className="text-charcoal-light">IN:</span> {inq.check_in || 'N/A'}</div>
                      <div><span className="text-charcoal-light">OUT:</span> {inq.check_out || 'N/A'}</div>
                      <div className="text-[10px] text-brass">{inq.guests || 1} Occupants</div>
                    </td>

                    <td className="p-4 max-w-xs space-y-1">
                      <div className="font-mono text-[10px] text-brass uppercase font-bold">
                        {inq.rooms?.name || 'Sanctuary Suite'}
                      </div>
                      <p className="text-charcoal-muted line-clamp-2 text-[11px]">
                        {inq.special_requests || 'No special requests.'}
                      </p>
                    </td>

                    <td className="p-4 font-mono text-[10px] uppercase">
                      <span className={`px-2.5 py-1 border inline-flex items-center space-x-1 ${
                        inq.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                          : inq.status === 'cancelled'
                          ? 'bg-red-500/10 text-red-700 border-red-500/30'
                          : 'bg-brass/10 text-brass border-brass/30'
                      }`}>
                        {inq.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                        {inq.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                        {(!inq.status || inq.status === 'pending') && <Clock className="w-3 h-3" />}
                        <span>{inq.status || 'pending'}</span>
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2 font-mono text-[10px]">
                      <button
                        onClick={() => handleStatusChange(inq.id, 'confirmed')}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(inq.id, 'cancelled')}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-800 border border-red-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </section>

      {/* SQL Notice */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-white border border-stone-border p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono text-xs text-brass uppercase font-bold">
              <Terminal className="w-4 h-4" />
              <span>Supabase Production Migration SQL</span>
            </div>
            <button
              onClick={handleCopySqlNotice}
              className="font-mono text-xs text-brass hover:underline flex items-center space-x-1"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied' : 'Copy SQL Location'}</span>
            </button>
          </div>
          <p className="font-sans text-xs text-charcoal-muted">
            The SQL script with pre-populated tables and security policies is at <code className="text-brass bg-sand px-2 py-0.5 border border-stone-border">/supabase/schema.sql</code>.
          </p>
        </div>
      </section>

    </div>
  );
};
