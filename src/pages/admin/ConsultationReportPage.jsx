import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const WEEKLY_DATA = [
  { week: 'Wk 1', scheduled: 14, attended: 12, cancelled: 2 },
  { week: 'Wk 2', scheduled: 18, attended: 15, cancelled: 3 },
  { week: 'Wk 3', scheduled: 22, attended: 20, cancelled: 2 },
  { week: 'Wk 4', scheduled: 19, attended: 17, cancelled: 2 },
]

const DURATION_DATA = [
  { day: 'Mon', avg: 45 },
  { day: 'Tue', avg: 52 },
  { day: 'Wed', avg: 38 },
  { day: 'Thu', avg: 60 },
  { day: 'Fri', avg: 42 },
]

const CONSULTATIONS = [
  { ref: 'CON-001', client: 'Thabo Mokoena', lawyer: 'Adv. S. Mosima', area: 'Labour & Employment Law', date: '2026-05-05', time: '09:00', duration: '45 min', status: 'Confirmed' },
  { ref: 'CON-002', client: 'Nomvula Dlamini', lawyer: 'Adv. P. Nkosi', area: 'Family Law', date: '2026-05-06', time: '11:00', duration: '60 min', status: 'Confirmed' },
  { ref: 'CON-003', client: 'Sipho Khumalo', lawyer: 'Adv. S. Mosima', area: 'Criminal Defence', date: '2026-05-07', time: '14:00', duration: '30 min', status: 'Confirmed' },
  { ref: 'CON-004', client: 'Lebo Sithole', lawyer: 'Adv. T. Dube', area: 'Estate & Succession', date: '2026-05-09', time: '13:00', duration: '45 min', status: 'Pending' },
  { ref: 'CON-005', client: 'Zanele Motha', lawyer: 'Adv. P. Nkosi', area: 'Property', date: '2026-05-10', time: '10:00', duration: 'TBD', status: 'Pending' },
]

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">{label}</span>
        <span className="material-symbols-outlined text-lg text-secondary">{icon}</span>
      </div>
      <p style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-4xl font-bold text-primary">{value}</p>
    </div>
  )
}

export default function ConsultationReportPage() {
  const totalScheduled = WEEKLY_DATA.reduce((s, d) => s + d.scheduled, 0)
  const totalAttended = WEEKLY_DATA.reduce((s, d) => s + d.attended, 0)
  const attendanceRate = ((totalAttended / totalScheduled) * 100).toFixed(1)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <nav className="flex text-xs font-label tracking-wide uppercase text-on-surface-variant mb-3">
            <span>Reports</span>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-on-background font-semibold">Consultation Schedule &amp; Attendance</span>
          </nav>
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-3xl font-bold text-primary">
            Consultation Schedule &amp; Attendance
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Tracks scheduled consultations, attendance rates, and duration metrics.
          </p>
        </div>
        <button
          className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity self-start"
          style={{ background: '#755b00' }}
        >
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total Scheduled" value={totalScheduled} icon="event" />
        <StatCard label="Attended" value={totalAttended} icon="how_to_reg" />
        <StatCard label="Attendance Rate" value={`${attendanceRate}%`} icon="trending_up" />
        <StatCard label="Avg Duration" value="47 min" icon="schedule" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background mb-5">
            Weekly Schedule vs Attendance
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_DATA} barGap={4}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 }} />
              <Bar dataKey="scheduled" fill="#adabab" radius={[3, 3, 0, 0]} name="Scheduled" />
              <Bar dataKey="attended" fill="#755b00" radius={[3, 3, 0, 0]} name="Attended" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background mb-5">
            Average Duration by Day (minutes)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={DURATION_DATA}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} domain={[0, 80]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 }} formatter={(v) => [`${v} min`]} />
              <Line type="monotone" dataKey="avg" stroke="#755b00" strokeWidth={2} dot={{ fill: '#755b00', r: 4 }} name="Avg Duration" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f3f3' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background">
            Upcoming Consultations
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#f3f3f3' }}>
              {['Ref', 'Client', 'Lawyer', 'Area', 'Date', 'Time', 'Duration', 'Status'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONSULTATIONS.map((c, i) => (
              <tr key={c.ref} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #f3f3f3' }}>
                <td className="px-5 py-3 text-xs font-medium" style={{ color: '#755b00' }}>{c.ref}</td>
                <td className="px-5 py-3 text-sm text-on-background">{c.client}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{c.lawyer}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{c.area}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{c.date}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{c.time}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{c.duration}</td>
                <td className="px-5 py-3">
                  {c.status === 'Confirmed' ? <span className="pill-approved">{c.status}</span> : <span className="pill-pending">{c.status}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
