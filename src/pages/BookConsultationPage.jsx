import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SERVICES = [
  'Labour & Employment Law',
  'Family Law & Divorce',
  'Property & Conveyancing',
  'Criminal Defence',
  'Contract & Commercial Law',
  'Personal Injury',
  'Immigration Law',
  'Estate & Succession',
]

const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

export default function BookConsultationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const prefill = location.state || {}

  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const [name, setName] = useState(prefill.name || '')
  const [email, setEmail] = useState(prefill.email || '')
  const [phone, setPhone] = useState(prefill.phone || '')
  const [service, setService] = useState(prefill.area || '')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [notes, setNotes] = useState('')

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function handleFile(file) {
    if (!file) return
    const allowed = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowed.includes(file.type)) {
      setUploadError('Only PDF, JPG, or PNG files are accepted.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5MB.')
      return
    }
    setUploadError('')
    setUploadedFile(file)
  }

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Full name is required'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email address is required'
    if (!phone.trim() || !/^0[0-9]{9}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Valid SA mobile number required (e.g. 0821234567)'
    if (!service) e.service = 'Please select a service'
    if (!date) e.date = 'Please select a date'
    if (!timeSlot) e.timeSlot = 'Please select a time slot'
    if (!uploadedFile) e.file = 'Proof of payment is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitting(true)
    setTimeout(() => {
      navigate('/book-consultation/success', {
        state: {
          name,
          email,
          service,
          date,
          timeSlot,
          ref: prefill.ref || `ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        },
      })
    }, 1200)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="min-h-screen" style={{ background: '#f9f9f9' }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,300..800;6..72,1,400&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
      />

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex justify-between items-center px-12 py-5 bg-white/90"
        style={{ backdropFilter: 'blur(16px)', borderBottom: '1px solid #f0f0f0' }}
      >
        <div style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-2xl font-bold text-on-background">
          Mosima Attorneys
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Consultations', 'Legal Services', 'Case Files', 'Contact'].map((item) => (
            <span
              key={item}
              className="text-sm text-on-surface-variant font-medium cursor-pointer hover:text-on-background transition-colors"
              style={item === 'Consultations' ? { color: '#1a1c1c', borderBottom: '2px solid #755b00', paddingBottom: '2px' } : {}}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-on-surface-variant font-medium hover:text-on-background transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="pt-16 pb-24 px-8 md:px-12 max-w-screen-xl mx-auto">
        <header className="mb-16">
          <h1
            style={{ fontFamily: 'Newsreader, Georgia, serif' }}
            className="text-5xl text-primary mb-4 font-light"
          >
            Book Your Consultation
          </h1>
          <p style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-on-surface-variant max-w-2xl text-lg italic">
            Please complete the steps below to secure your appointment. All bookings require manual verification
            of proof of payment by our administrative team.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Upload + Consultation Details */}
          <div className="lg:col-span-5 flex flex-col gap-10">

            {/* Step 1: Proof of Payment */}
            <section>
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs"
                  style={{ background: '#755b00' }}
                >
                  01
                </span>
                <h2 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-2xl font-medium">
                  Upload Proof of Payment
                </h2>
              </div>
              <div className="p-8 rounded-lg" style={{ background: '#f3f3f3' }}>
                <div
                  className="border-2 border-dashed p-12 rounded-lg flex flex-col items-center text-center gap-4 cursor-pointer transition-all"
                  style={{
                    borderColor: dragOver ? '#755b00' : '#d0c5b2',
                    background: dragOver ? '#fff9e6' : '#ffffff',
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragOver(false)
                    handleFile(e.dataTransfer.files[0])
                  }}
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <span className="material-symbols-outlined text-5xl" style={{ color: '#755b00' }}>cloud_upload</span>
                  <div>
                    <p className="font-medium text-primary mb-1">Drag your proof of payment here</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label">
                      Supports PDF, JPG, or PNG (Max 5MB)
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 text-xs font-medium text-primary rounded-lg transition-all"
                    style={{ background: '#eeeeee' }}
                    type="button"
                  >
                    Browse Files
                  </button>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {uploadedFile && (
                  <div
                    className="mt-4 flex items-center justify-between p-4 rounded-lg"
                    style={{ background: '#e8e8e8' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">description</span>
                      <div>
                        <p className="text-sm font-medium text-on-background">{uploadedFile.name}</p>
                        <p className="text-xs text-on-surface-variant">
                          {(uploadedFile.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="p-1 rounded-full hover:bg-error-container/20 transition-colors"
                      style={{ color: '#ba1a1a' }}
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                )}

                {(uploadError || errors.file) && (
                  <div className="mt-3 flex items-center gap-2" style={{ color: '#ba1a1a' }}>
                    <span className="material-symbols-outlined text-sm">error</span>
                    <p className="text-xs">{uploadError || errors.file}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Step 2: Consultation Details */}
            <section>
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs"
                  style={{ background: '#755b00' }}
                >
                  02
                </span>
                <h2 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-2xl font-medium">
                  Consultation Details
                </h2>
              </div>
              <div className="p-8 rounded-lg space-y-6" style={{ background: '#f3f3f3' }}>
                <div>
                  <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
                    Area of Law
                  </label>
                  <select
                    className="w-full bg-transparent text-sm py-2 outline-none appearance-none cursor-pointer text-on-background"
                    style={{ borderBottom: '1px solid #d0c5b2' }}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{errors.service}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    className="w-full bg-transparent text-sm py-2 outline-none text-on-background"
                    style={{ borderBottom: '1px solid #d0c5b2' }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {errors.date && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{errors.date}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-3">
                    Preferred Time
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeSlot(t)}
                        className="px-4 py-2 text-xs font-medium rounded-full transition-all"
                        style={{
                          background: timeSlot === t ? '#755b00' : '#eeeeee',
                          color: timeSlot === t ? '#ffffff' : '#5f5e5e',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.timeSlot && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{errors.timeSlot}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-transparent text-sm py-2 outline-none resize-none text-on-background"
                    style={{ borderBottom: '1px solid #d0c5b2' }}
                    placeholder="Any details you would like us to know..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right: Contact Info + Summary */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            {/* Step 3: Contact Details */}
            <section>
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs"
                  style={{ background: '#755b00' }}
                >
                  03
                </span>
                <h2 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-2xl font-medium">
                  Your Details
                </h2>
              </div>
              <div className="p-8 rounded-lg space-y-6" style={{ background: '#f3f3f3' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-transparent text-sm py-2 outline-none text-on-background placeholder-on-surface-variant"
                      style={{ borderBottom: '1px solid #d0c5b2' }}
                      placeholder="e.g. Thabo Mokoena"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent text-sm py-2 outline-none text-on-background"
                      style={{ borderBottom: '1px solid #d0c5b2' }}
                      placeholder="e.g. thabo@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-transparent text-sm py-2 outline-none text-on-background"
                      style={{ borderBottom: '1px solid #d0c5b2' }}
                      placeholder="e.g. 0821234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Booking Summary */}
            <section
              className="p-8 rounded-xl"
              style={{ background: '#ffffff', boxShadow: '0 8px 24px rgba(26,28,28,0.08)' }}
            >
              <h3 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-xl font-semibold text-on-background mb-6">
                Booking Summary
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Client', value: name || 'Not yet provided' },
                  { label: 'Service', value: service || 'Not yet selected' },
                  { label: 'Date', value: date || 'Not yet selected' },
                  { label: 'Time', value: timeSlot || 'Not yet selected' },
                  { label: 'Payment', value: uploadedFile ? uploadedFile.name : 'Not yet uploaded' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">{row.label}</span>
                    <span className="text-sm text-on-background font-medium text-right max-w-[60%]">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg" style={{ background: '#f3f3f3', borderLeft: '4px solid #755b00' }}>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Your booking will be in a <strong>Pending</strong> state until our admin team verifies your proof of payment. You will receive a confirmation email once approved.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-6 w-full py-3.5 text-sm font-semibold text-white rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ background: submitting ? '#adabab' : '#5f5e5e' }}
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">send</span>
                    Submit Booking Request
                  </>
                )}
              </button>

              <p className="mt-4 text-xs text-center text-on-surface-variant">
                By submitting, you agree to our terms and POPIA privacy policy.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
