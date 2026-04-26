import { useState } from 'react'

const INITIAL_BOOKINGS = [
  { id: 'B-001', ref: 'ENQ-2026-4821', client: 'Thabo Mokoena', service: 'Labour & Employment Law', date: '2026-05-05', time: '09:00', submitted: '2026-04-25', status: 'Pending', file: 'proof_payment_thabo.pdf' },
  { id: 'B-002', ref: 'ENQ-2026-3390', client: 'Nomvula Dlamini', service: 'Family Law & Divorce', date: '2026-05-06', time: '11:00', submitted: '2026-04-24', status: 'Pending', file: 'eft_confirmation.pdf' },
  { id: 'B-003', ref: 'ENQ-2026-2210', client: 'Sipho Khumalo', service: 'Criminal Defence', date: '2026-05-07', time: '14:00', submitted: '2026-04-23', status: 'Approved', file: 'payment_sipho.png' },
  { id: 'B-004', ref: 'ENQ-2026-1105', client: 'Ayanda Nkosi', service: 'Property & Conveyancing', date: '2026-05-08', time: '10:00', submitted: '2026-04-22', status: 'Rejected', file: 'proof.jpg' },
  { id: 'B-005', ref: 'ENQ-2026-5503', client: 'Lebo Sithole', service: 'Estate & Succession', date: '2026-05-09', time: '13:00', submitted: '2026-04-26', status: 'Pending', file: 'eft_lebo.pdf' },
]

function StatusPill({ status }) {
  if (status === 'Approved') return <span className="pill-approved">Approved</span>
  if (status === 'Rejected') return <span className="pill-rejected">Rejected</span>
  return <span className="pill-pending">Pending</span>
}

function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: 'rgba(26,28,28,0.4)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md"
        style={{ boxShadow: '0 24px 48px rgba(26,28,28,0.18)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-xl font-semibold text-on-background">
            {title}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-background transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function ConsultationVerificationPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS)
  const [filter, setFilter] = useState('All')
  const [approveTarget, setApproveTarget] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [search, setSearch] = useState('')

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    rejected: bookings.filter((b) => b.status === 'Rejected').length,
  }

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === 'All' || b.status === filter
    const matchSearch = !search || b.client.toLowerCase().includes(search.toLowerCase()) || b.ref.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  function approve(id) {
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status: 'Approved' } : b)))
    setApproveTarget(null)
  }

  function reject(id) {
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status: 'Rejected' } : b)))
    setRejectTarget(null)
    setRejectReason('')
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-xs font-label tracking-wide uppercase text-on-surface-variant">
        <span>Dashboard</span>
        <span className="mx-2 opacity-40">/</span>
        <span className="text-on-background font-semibold">Consultation Verification</span>
      </nav>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {[
          { label: 'Total', value: stats.total, icon: 'calendar_month', color: '#5f5e5e' },
          { label: 'Pending', value: stats.pending, icon: 'hourglass_empty', color: '#92400e' },
          { label: 'Approved', value: stats.approved, icon: 'check_circle', color: '#065f46' },
          { label: 'Rejected', value: stats.rejected, icon: 'cancel', color: '#93000a' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">{s.label}</span>
              <span className="material-symbols-outlined text-lg" style={{ color: s.color }}>{s.icon}</span>
            </div>
            <p className="text-4xl font-bold" style={{ color: s.color, fontFamily: 'Newsreader, Georgia, serif' }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <h2 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-2xl font-bold text-primary flex-1">
          Booking Requests
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#f3f3f3' }}>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input
              className="bg-transparent text-xs outline-none w-36 text-on-background"
              placeholder="Search client or ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 text-xs rounded-full font-medium transition-all"
              style={{
                background: filter === f ? '#5f5e5e' : '#f3f3f3',
                color: filter === f ? '#ffffff' : '#5f5e5e',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#f3f3f3' }}>
              {['Reference', 'Client', 'Service', 'Date & Time', 'Submitted', 'Payment', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-4 text-xs uppercase tracking-wider text-on-surface-variant font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr
                key={b.id}
                style={{ background: i % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #f3f3f3' }}
                className="hover:bg-surface-container-low transition-colors"
              >
                <td className="px-5 py-4 text-xs font-medium text-secondary">{b.ref}</td>
                <td className="px-5 py-4 text-sm font-medium text-on-background">{b.client}</td>
                <td className="px-5 py-4 text-sm text-on-surface-variant">{b.service}</td>
                <td className="px-5 py-4 text-sm text-on-background">
                  <div>{b.date}</div>
                  <div className="text-xs text-on-surface-variant">{b.time}</div>
                </td>
                <td className="px-5 py-4 text-sm text-on-surface-variant">{b.submitted}</td>
                <td className="px-5 py-4">
                  <button className="flex items-center gap-1 text-xs text-primary hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-sm">description</span>
                    {b.file}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <StatusPill status={b.status} />
                </td>
                <td className="px-5 py-4">
                  {b.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setApproveTarget(b)}
                        className="p-1.5 rounded-lg text-white transition-all hover:opacity-90"
                        style={{ background: '#065f46' }}
                        title="Approve"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                      <button
                        onClick={() => setRejectTarget(b)}
                        className="p-1.5 rounded-lg text-white transition-all hover:opacity-90"
                        style={{ background: '#ba1a1a' }}
                        title="Reject"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-on-surface-variant text-sm">
                  No bookings match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approve Modal */}
      {approveTarget && (
        <Modal title="Confirm Approval" onClose={() => setApproveTarget(null)}>
          <div className="p-4 rounded-xl mb-6" style={{ background: '#f3f3f3' }}>
            <p className="text-sm text-on-surface-variant mb-1">Client</p>
            <p className="font-semibold text-on-background">{approveTarget.client}</p>
            <p className="text-sm text-on-surface-variant mt-3 mb-1">Service</p>
            <p className="font-medium text-on-background">{approveTarget.service}</p>
            <p className="text-sm text-on-surface-variant mt-3 mb-1">Date & Time</p>
            <p className="font-medium text-on-background">{approveTarget.date} at {approveTarget.time}</p>
          </div>
          <p className="text-sm text-on-surface-variant mb-6">
            Approving this request will confirm the consultation and notify the client via email.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => approve(approveTarget.id)}
              className="flex-1 py-3 text-sm font-semibold text-white rounded-lg"
              style={{ background: '#065f46' }}
            >
              Confirm Approval
            </button>
            <button
              onClick={() => setApproveTarget(null)}
              className="flex-1 py-3 text-sm font-medium rounded-lg"
              style={{ background: '#f3f3f3', color: '#5f5e5e' }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <Modal title="Reject Submission" onClose={() => setRejectTarget(null)}>
          <div className="p-4 rounded-xl mb-5" style={{ background: '#f3f3f3' }}>
            <p className="text-sm text-on-surface-variant mb-1">Client</p>
            <p className="font-semibold text-on-background">{rejectTarget.client}</p>
          </div>
          <div className="mb-6">
            <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
              Reason for Rejection
            </label>
            <textarea
              rows={3}
              className="w-full text-sm p-3 rounded-lg outline-none resize-none text-on-background"
              style={{ background: '#f3f3f3', border: '1px solid #e8e8e8' }}
              placeholder="e.g. Proof of payment is illegible..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => reject(rejectTarget.id)}
              className="flex-1 py-3 text-sm font-semibold text-white rounded-lg"
              style={{ background: '#ba1a1a' }}
            >
              Reject Submission
            </button>
            <button
              onClick={() => setRejectTarget(null)}
              className="flex-1 py-3 text-sm font-medium rounded-lg"
              style={{ background: '#f3f3f3', color: '#5f5e5e' }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
