import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const STAFF = [
  { name: 'Adv. S. Mosima', role: 'Senior Advocate', assigned: 14, completed: 11, pending: 3, load: 'High' },
  { name: 'Adv. P. Nkosi', role: 'Advocate', assigned: 10, completed: 8, pending: 2, load: 'Medium' },
  { name: 'Adv. T. Dube', role: 'Associate Advocate', assigned: 7, completed: 5, pending: 2, load: 'Medium' },
  { name: 'Adm. R. Khumalo', role: 'Admin Manager', assigned: 22, completed: 19, pending: 3, load: 'High' },
  { name: 'Adm. L. Sithole', role: 'Admin Officer', assigned: 16, completed: 14, pending: 2, load: 'Medium' },
  { name: 'Adm. Z. Motha', role: 'Admin Officer', assigned: 8, completed: 8, pending: 0, load: 'Low' },
]

const WORKLOAD_DATA = STAFF.map((s) => ({
  name: s.name.split(' ')[1],
  assigned: s.assigned,
  completed: s.completed,
}))

const RADAR_DATA = [
  { subject: 'Enquiries', A: 85 },
  { subject: 'Consultations', A: 72 },
  { subject: 'Admin Tasks', A: 90 },
  { subject: 'Client Comms', A: 65 },
  { subject: 'Verifications', A: 88 },
]

function LoadBadge({ load }) {
  if (load === 'High') return <span className="pill-rejected">High</span>
  if (load === 'Medium') return <span className="pill-pending">Medium</span>
  return <span className="pill-approved">Low</span>
}

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

export default function StaffReportPage() {
  const totalAssigned = STAFF.reduce((s, m) => s + m.assigned, 0)
  const totalCompleted = STAFF.reduce((s, m) => s + m.completed, 0)
  const completionRate = ((totalCompleted / totalAssigned) * 100).toFixed(1)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <nav className="flex text-xs font-label tracking-wide uppercase text-on-surface-variant mb-3">
            <span>Reports</span>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-on-background font-semibold">Staff Task &amp; Workload</span>
          </nav>
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-3xl font-bold text-primary">
            Staff Task &amp; Workload Report
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Monitors individual and team task allocation, completion rates, and capacity.
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
        <StatCard label="Total Staff" value={STAFF.length} icon="groups" />
        <StatCard label="Tasks Assigned" value={totalAssigned} icon="assignment" />
        <StatCard label="Tasks Completed" value={totalCompleted} icon="task_alt" />
        <StatCard label="Completion Rate" value={`${completionRate}%`} icon="trending_up" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background mb-5">
            Task Load per Staff Member
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WORKLOAD_DATA} layout="vertical" barGap={4}>
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7e7665' }} width={60} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 }} />
              <Bar dataKey="assigned" fill="#adabab" radius={[0, 3, 3, 0]} name="Assigned" />
              <Bar dataKey="completed" fill="#755b00" radius={[0, 3, 3, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background mb-5">
            Team Capacity by Function
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="#eeeeee" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#7e7665' }} />
              <Radar name="Capacity" dataKey="A" stroke="#755b00" fill="#755b00" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.05)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f3f3' }}>
          <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-on-background">
            Staff Breakdown
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#f3f3f3' }}>
              {['Name', 'Role', 'Assigned', 'Completed', 'Pending', 'Completion %', 'Load'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STAFF.map((s, i) => {
              const pct = ((s.completed / s.assigned) * 100).toFixed(0)
              return (
                <tr key={s.name} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #f3f3f3' }}>
                  <td className="px-5 py-3 text-sm font-medium text-on-background">{s.name}</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{s.role}</td>
                  <td className="px-5 py-3 text-sm text-on-background font-medium">{s.assigned}</td>
                  <td className="px-5 py-3 text-sm text-on-background">{s.completed}</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{s.pending}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-surface-container-high">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${pct}%`, background: Number(pct) >= 80 ? '#755b00' : '#adabab' }}
                        />
                      </div>
                      <span className="text-xs text-on-surface-variant w-8 text-right">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <LoadBadge load={s.load} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
