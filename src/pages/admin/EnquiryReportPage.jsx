import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const MONTHLY_DATA = [
  { month: 'Jan', received: 42, converted: 28, outOfScope: 6 },
  { month: 'Feb', received: 38, converted: 24, outOfScope: 5 },
  { month: 'Mar', received: 55, converted: 39, outOfScope: 8 },
  { month: 'Apr', received: 61, converted: 44, outOfScope: 7 },
]

const BY_AREA = [
  { name: 'Labour & Employment', value: 38 },
  { name: 'Family Law', value: 22 },
  { name: 'Property', value: 15 },
  { name: 'Criminal', value: 12 },
  { name: 'Other', value: 13 },
]

const COLORS = ['#5f5e5e', '#755b00', '#adabab', '#d0c5b2', '#e2e2e2']

const ENQUIRIES = [
  { ref: 'ENQ-2026-4821', client: 'Thabo Mokoena', area: 'Labour & Employment Law', date: '2026-04-25', status: 'Converted', outcome: 'Booked' },
  { ref: 'ENQ-2026-3390', client: 'Nomvula Dlamini', area: 'Family Law & Divorce', date: '2026-04-24', status: 'Converted', outcome: 'Booked' },
  { ref: 'ENQ-2026-2870', client: 'Zanele Motha', area: 'Property & Conveyancing', date: '2026-04-23', status: 'Open', outcome: 'Awaiting' },
  { ref: 'ENQ-2026-2210', client: 'Sipho Khumalo', area: 'Criminal Defence', date: '2026-04-23', status: 'Converted', outcome: 'Booked' },
  { ref: 'ENQ-2026-1900', client: 'Palesa Motsepe', area: 'Contract Law', date: '2026-04-22', status: 'Out of Scope', outcome: 'Referred' },
  { ref: 'ENQ-2026-1105', client: 'Ayanda Nkosi', area: 'Property & Conveyancing', date: '2026-04-22', status: 'Converted', outcome: 'Booked' },
]

function StatCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">{label}</span>
        <span className="material-symbols-outlined text-lg text-secondary">{icon}</span>
      </div>
      <p style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-4xl font-bold text-primary">{value}</p>
      {sub && <p className="text-xs text-on-surface-variant mt-1">{sub}</p>}
    </div>
  )
}

export default function EnquiryReportPage() {
  const [dateFrom, setDateFrom] = useState('2026-01-01')
  const [dateTo, setDateTo] = useState('2026-04-26')

  const totalReceived = MONTHLY_DATA.reduce((s, d) => s + d.received, 0)
  const totalConverted = MONTHLY_DATA.reduce((s, d) => s + d.converted, 0)
  const conversionRate = ((totalConverted / totalReceived) * 100).toFixed(1)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <nav className="flex text-xs font-label tracking-wide uppercase text-on-surface-variant mb-3">
            <span>Reports</span>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-on-background font-semibold">Enquiry Status &amp; Conversion</span>
          </nav>
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-3xl font-bold text-primary">
            Enquiry Status &amp; Conversion Report
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Tracks enquiry volume, conversion rates, and legal area distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#f3f3f3' }}>
            <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
            <input
              type="date"
              className="bg-transparent text-xs outline-none text-primary font-medium"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <span className="text-primary text-xs">to</span>
            <input
              type="date"
              className="bg-transparent text-xs outline-none text-primary font-medium"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <button
            className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: '#755b00' }}
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total Enquiries" value={totalReceived} sub="In selected period" icon="how_to_reg" />
        <StatCard label="Converted" value={totalConverted} sub="Booked consultation" icon="event_available" />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} sub="Enquiry to booking" icon="trending_up" />
        <StatCard label="Out of Scope" value={MONTHLY_DATA.reduce((s, d) => s + d.outOfScope, 0)} sub="Referred or dismissed" icon="block" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background mb-5">
            Monthly Enquiry Volume
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DATA} barGap={4}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 }}
              />
              <Bar dataKey="received" fill="#adabab" radius={[3, 3, 0, 0]} name="Received" />
              <Bar dataKey="converted" fill="#755b00" radius={[3, 3, 0, 0]} name="Converted" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background mb-5">
            Enquiries by Legal Area
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={BY_AREA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {BY_AREA.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} enquiries`]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detail table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f3f3' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background">
            Enquiry Detail
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#f3f3f3' }}>
              {['Reference', 'Client', 'Legal Area', 'Date', 'Status', 'Outcome'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ENQUIRIES.map((e, i) => (
              <tr
                key={e.ref}
                style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #f3f3f3' }}
              >
                <td className="px-5 py-3 text-xs font-medium" style={{ color: '#755b00' }}>{e.ref}</td>
                <td className="px-5 py-3 text-sm text-on-background">{e.client}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{e.area}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{e.date}</td>
                <td className="px-5 py-3">
                  {e.status === 'Converted' && <span className="pill-approved">{e.status}</span>}
                  {e.status === 'Open' && <span className="pill-pending">{e.status}</span>}
                  {e.status === 'Out of Scope' && <span className="pill-rejected">{e.status}</span>}
                </td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{e.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
