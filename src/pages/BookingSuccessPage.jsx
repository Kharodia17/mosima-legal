import { useNavigate, useLocation } from 'react-router-dom'

export default function BookingSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { name, email, service, date, timeSlot, ref } = state || {}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#f9f9f9' }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,300..800;6..72,1,400&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
      />

      <div
        className="w-full max-w-lg bg-white rounded-2xl p-12 text-center"
        style={{ boxShadow: '0 8px 24px rgba(26,28,28,0.08)' }}
      >
        {/* Success Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(16,185,129,0.1)' }}
        >
          <span className="material-symbols-outlined text-3xl" style={{ color: '#065f46', fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: '#755b00' }}>
          Booking Received
        </p>

        <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-4xl font-light text-on-background mb-4">
          Your request is pending review.
        </h1>

        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
          Our administrative team will verify your proof of payment and confirm your consultation. You will receive an email at{' '}
          <strong className="text-on-background">{email || 'your registered email'}</strong>.
        </p>

        {/* Summary card */}
        <div className="text-left rounded-xl p-6 space-y-3 mb-8" style={{ background: '#f3f3f3' }}>
          <p className="text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-4">Booking Details</p>
          {[
            { label: 'Reference', value: ref },
            { label: 'Client', value: name },
            { label: 'Service', value: service },
            { label: 'Date', value: date },
            { label: 'Time', value: timeSlot },
            { label: 'Status', value: 'Pending Verification' },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-on-surface-variant">{row.label}</span>
              <span
                className="font-medium"
                style={row.label === 'Status' ? { color: '#92400e' } : { color: '#1a1c1c' }}
              >
                {row.value || 'N/A'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/enquiry')}
            className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-all"
            style={{ background: '#5f5e5e' }}
          >
            Log Another Enquiry
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 text-sm font-medium rounded-lg transition-all"
            style={{ background: '#f3f3f3', color: '#5f5e5e' }}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  )
}
