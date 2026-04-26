import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/admin/consultations', icon: 'gavel', label: 'Consultations' },
  { to: '/admin/reports/enquiry', icon: 'query_stats', label: 'Enquiry Report' },
  { to: '/admin/reports/consultations', icon: 'event_note', label: 'Consultation Report' },
  { to: '/admin/reports/staff', icon: 'groups', label: 'Staff Report' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen text-on-surface">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,300..800;6..72,1,400&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
      />

      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-screen w-60 flex flex-col py-8 z-50"
        style={{ background: '#5f5e5e', boxShadow: '8px 0 24px rgba(26,28,28,0.08)' }}
      >
        <div className="px-6 mb-10">
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-xl font-medium text-white tracking-tight">
            Mosima Attorneys
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1 font-label">
            Legal Excellence
          </p>
        </div>

        <nav className="flex-1 flex flex-col">
          <p className="px-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-label mb-2">
            Management
          </p>
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-6 space-y-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => navigate('/')}
            className="sidebar-link w-full text-left"
            style={{ padding: '0.5rem 0' }}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 w-full h-16 flex justify-between items-center px-8"
          style={{ background: '#ffffff', boxShadow: '0 1px 0 #eeeeee' }}
        >
          <div />
          <div className="flex items-center gap-4">
            <button className="text-primary/70 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid #eeeeee' }}>
              <span className="text-sm font-semibold text-primary">Admin User</span>
              <span className="material-symbols-outlined text-primary">account_circle</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
