import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,300..800;6..72,1,400&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
      />

      {/* Header */}
      <header className="px-12 py-8 flex items-center justify-between border-b border-surface-container">
        <div>
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-2xl font-bold text-primary tracking-tight">
            Mosima Attorneys
          </h1>
          <p className="text-xs uppercase tracking-widest text-secondary mt-0.5 font-medium">
            Sovereign Legal Support
          </p>
        </div>
        <span className="text-xs text-on-surface-variant">Legal Management System</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-24">
        <div className="text-center mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary font-medium mb-6">
            Mosima Attorneys Portal
          </p>
          <h2
            style={{ fontFamily: 'Newsreader, Georgia, serif' }}
            className="text-6xl font-light text-on-background mb-6 leading-tight"
          >
            The legal backing you need{' '}
            <em>when everything is at stake.</em>
          </h2>
          <p className="text-on-surface-variant text-lg">
            Select your access portal below to continue.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Client Portal */}
          <button
            onClick={() => navigate('/enquiry')}
            className="group text-left bg-surface-container-lowest rounded-xl p-10 transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.06)' }}
          >
            <span className="material-symbols-outlined text-secondary text-4xl mb-6 block">
              chat_bubble_outline
            </span>
            <h3
              style={{ fontFamily: 'Newsreader, Georgia, serif' }}
              className="text-2xl font-semibold text-on-background mb-3"
            >
              Client Portal
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Log a legal enquiry, book a consultation, or track your case status.
            </p>
            <div className="flex items-center gap-2 text-secondary text-sm font-medium">
              <span>Enter Portal</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>

          {/* Admin Portal */}
          <button
            onClick={() => navigate('/admin')}
            className="group text-left bg-primary rounded-xl p-10 transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: '0 2px 8px rgba(26,28,28,0.12)' }}
          >
            <span className="material-symbols-outlined text-secondary text-4xl mb-6 block">
              admin_panel_settings
            </span>
            <h3
              style={{ fontFamily: 'Newsreader, Georgia, serif' }}
              className="text-2xl font-semibold text-white mb-3"
            >
              Staff Portal
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Manage consultations, verify payments, access reports and client records.
            </p>
            <div className="flex items-center gap-2 text-secondary text-sm font-medium">
              <span>Enter Portal</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-6 border-t border-surface-container flex items-center justify-between">
        <p className="text-xs text-on-surface-variant">
          &copy; 2026 Mosima Attorneys. All rights reserved.
        </p>
        <p className="text-xs text-on-surface-variant">
          Protected under POPIA &mdash; Your data is safe with us.
        </p>
      </footer>
    </div>
  )
}
