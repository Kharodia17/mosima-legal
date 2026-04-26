import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LEGAL_AREAS = [
  'Labour & Employment Law',
  'Family Law & Divorce',
  'Property & Conveyancing',
  'Criminal Defence',
  'Contract & Commercial Law',
  'Personal Injury',
  'Immigration Law',
  'Estate & Succession',
]

const STEPS = {
  GREETING: 'greeting',
  AREA_INPUT: 'area_input',
  AREA_CONFIRM: 'area_confirm',
  CONTACT_PROMPT: 'contact_prompt',
  CONTACT_FORM: 'contact_form',
  CONSULT_OFFER: 'consult_offer',
  LOGGED: 'logged',
  OUT_OF_SCOPE: 'out_of_scope',
}

function BotAvatar() {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[10px] tracking-tighter"
      style={{ background: '#5f5e5e' }}
    >
      MA
    </div>
  )
}

function BotBubble({ children }) {
  return (
    <div className="flex gap-3 items-end">
      <BotAvatar />
      <div
        className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm max-w-[85%]"
        style={{ border: '1px solid #f0f0f0' }}
      >
        <div className="text-sm leading-relaxed" style={{ color: '#5f5e5e' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div
        className="p-4 rounded-2xl rounded-br-none shadow-md max-w-[85%] text-sm leading-relaxed text-white"
        style={{ background: '#5f5e5e' }}
      >
        {children}
      </div>
    </div>
  )
}

function ChoiceButton({ onClick, children, variant = 'secondary' }) {
  const base = 'px-4 py-2 text-xs font-medium rounded-full transition-all active:scale-95'
  const styles =
    variant === 'secondary'
      ? `${base} text-white`
      : `${base} bg-white border text-primary`
  return (
    <button
      onClick={onClick}
      className={styles}
      style={
        variant === 'secondary'
          ? { background: '#755b00', borderColor: 'transparent' }
          : { borderColor: '#d0c5b2', color: '#5f5e5e' }
      }
    >
      {children}
    </button>
  )
}

function generateRef() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `ENQ-2026-${num}`
}

export default function ChatbotPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(STEPS.GREETING)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [detectedArea, setDetectedArea] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [enquiryRef] = useState(generateRef)
  const [formErrors, setFormErrors] = useState({})
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, step])

  const addBot = (content) =>
    setMessages((m) => [...m, { role: 'bot', content }])
  const addUser = (content) =>
    setMessages((m) => [...m, { role: 'user', content }])

  function handleSubmitMatter() {
    if (!userInput.trim()) return
    addUser(userInput)
    const lower = userInput.toLowerCase()
    let area = ''
    if (lower.includes('dismiss') || lower.includes('labour') || lower.includes('employment') || lower.includes('retrench')) area = 'Labour & Employment Law'
    else if (lower.includes('divorce') || lower.includes('custody') || lower.includes('family') || lower.includes('marriage')) area = 'Family Law & Divorce'
    else if (lower.includes('property') || lower.includes('transfer') || lower.includes('bond')) area = 'Property & Conveyancing'
    else if (lower.includes('crimin') || lower.includes('arrest') || lower.includes('charge')) area = 'Criminal Defence'
    else if (lower.includes('contract') || lower.includes('commercial') || lower.includes('business')) area = 'Contract & Commercial Law'
    else if (lower.includes('injury') || lower.includes('accident') || lower.includes('negligence')) area = 'Personal Injury'
    else if (lower.includes('immigr') || lower.includes('visa') || lower.includes('permit')) area = 'Immigration Law'
    else if (lower.includes('estate') || lower.includes('will') || lower.includes('inherit')) area = 'Estate & Succession'

    setUserInput('')
    setTimeout(() => {
      if (area) {
        setDetectedArea(area)
        setStep(STEPS.AREA_CONFIRM)
      } else {
        setStep(STEPS.OUT_OF_SCOPE)
      }
    }, 600)
  }

  function handleAreaConfirm(yes) {
    if (yes) {
      addUser('Yes, that\'s correct')
      setTimeout(() => setStep(STEPS.CONTACT_PROMPT), 400)
    } else {
      addUser('No, try again')
      setTimeout(() => {
        setDetectedArea('')
        setStep(STEPS.AREA_INPUT)
      }, 400)
    }
  }

  function handleContactSubmit() {
    const errors = {}
    if (!contactName.trim()) errors.name = 'Name is required'
    if (!contactEmail.trim() || !/\S+@\S+\.\S+/.test(contactEmail)) errors.email = 'Valid email required'
    if (!contactPhone.trim() || !/^0[0-9]{9}$/.test(contactPhone.replace(/\s/g, ''))) errors.phone = 'Valid SA mobile number required'
    setFormErrors(errors)
    if (Object.keys(errors).length) return
    addUser(`${contactName} | ${contactEmail} | ${contactPhone}`)
    setTimeout(() => setStep(STEPS.CONSULT_OFFER), 500)
  }

  function handleConsultDecision(wantsConsult) {
    if (wantsConsult) {
      addUser('Yes, book a consultation')
      setTimeout(() => {
        setStep(STEPS.LOGGED)
        navigate('/book-consultation', {
          state: { ref: enquiryRef, area: detectedArea, name: contactName, email: contactEmail, phone: contactPhone },
        })
      }, 800)
    } else {
      addUser('No, just enquiring')
      setTimeout(() => setStep(STEPS.LOGGED), 500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f5f5' }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,300..800;6..72,1,400&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
      />

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 h-16 z-40 flex items-center px-4 md:px-12 justify-between"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #f0f0f0' }}
      >
        <div className="flex flex-col">
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif' }} className="text-lg font-semibold text-primary leading-tight">
            Mosima Attorneys
          </h1>
          <p className="text-[10px] text-on-surface-variant hidden md:block">
            The legal backing you need when everything is at stake.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all hover:bg-surface-container-low"
            style={{ border: '1px solid #5f5e5e', color: '#5f5e5e' }}
          >
            Back
          </button>
        </div>
      </header>

      {/* Chat area */}
      <main className="pt-20 pb-8 flex-1 max-w-2xl mx-auto w-full px-4 space-y-5">
        {/* Initial bot greeting */}
        <BotBubble>
          Welcome to Mosima Attorneys. What legal matter can we help you with today?
        </BotBubble>

        {/* Rendered message history */}
        {messages.map((m, i) =>
          m.role === 'bot' ? (
            <BotBubble key={i}>{m.content}</BotBubble>
          ) : (
            <UserBubble key={i}>{m.content}</UserBubble>
          )
        )}

        {/* Step-based UI */}
        {step === STEPS.GREETING && (
          <div className="pl-11">
            <div className="flex gap-2 flex-wrap">
              {LEGAL_AREAS.slice(0, 4).map((a) => (
                <ChoiceButton
                  key={a}
                  variant="outline"
                  onClick={() => {
                    setDetectedArea(a)
                    addUser(a)
                    setTimeout(() => setStep(STEPS.AREA_CONFIRM), 400)
                  }}
                >
                  {a}
                </ChoiceButton>
              ))}
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <input
                className="flex-1 text-sm px-4 py-2 rounded-lg bg-white border text-on-background outline-none focus:border-secondary transition-colors"
                style={{ borderColor: '#d0c5b2' }}
                placeholder="Or describe your legal matter..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitMatter()}
              />
              <button
                onClick={handleSubmitMatter}
                className="p-2 rounded-lg text-white transition-all active:scale-95"
                style={{ background: '#5f5e5e' }}
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        )}

        {step === STEPS.AREA_CONFIRM && (
          <div className="pl-11 space-y-3">
            <BotBubble>
              Your matter appears to fall under{' '}
              <strong style={{ color: '#755b00' }}>{detectedArea}</strong>. Is that correct?
            </BotBubble>
            <div className="flex gap-2">
              <ChoiceButton onClick={() => handleAreaConfirm(true)}>Yes, that&apos;s correct</ChoiceButton>
              <ChoiceButton variant="outline" onClick={() => handleAreaConfirm(false)}>No, try again</ChoiceButton>
            </div>
          </div>
        )}

        {step === STEPS.CONTACT_PROMPT && (
          <div className="pl-11 space-y-3">
            <BotBubble>
              Great. To log your enquiry under <strong>{detectedArea}</strong>, please provide your contact details.
            </BotBubble>
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4" style={{ border: '1px solid #f0f0f0' }}>
              <div>
                <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-1">Full Name</label>
                <input
                  className="w-full text-sm px-0 py-1.5 bg-transparent outline-none text-on-background"
                  style={{ borderBottom: '1px solid #d0c5b2' }}
                  placeholder="e.g. Thabo Mokoena"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                {formErrors.name && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{formErrors.name}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full text-sm px-0 py-1.5 bg-transparent outline-none text-on-background"
                  style={{ borderBottom: '1px solid #d0c5b2' }}
                  placeholder="e.g. thabo@email.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                {formErrors.email && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{formErrors.email}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-on-surface-variant font-medium block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full text-sm px-0 py-1.5 bg-transparent outline-none text-on-background"
                  style={{ borderBottom: '1px solid #d0c5b2' }}
                  placeholder="e.g. 0821234567"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
                {formErrors.phone && <p className="text-xs mt-1" style={{ color: '#ba1a1a' }}>{formErrors.phone}</p>}
              </div>
              <button
                onClick={handleContactSubmit}
                className="w-full py-2.5 text-sm font-medium text-white rounded-lg transition-all active:scale-95"
                style={{ background: '#5f5e5e' }}
              >
                Submit Contact Details
              </button>
            </div>
          </div>
        )}

        {step === STEPS.CONSULT_OFFER && (
          <div className="pl-11 space-y-3">
            <BotBubble>
              Would you like to book a consultation with our team? A consultation fee applies and proof of payment is required.
            </BotBubble>
            <div className="flex gap-2">
              <ChoiceButton onClick={() => handleConsultDecision(true)}>Yes, book a consultation</ChoiceButton>
              <ChoiceButton variant="outline" onClick={() => handleConsultDecision(false)}>No, just enquiring</ChoiceButton>
            </div>
          </div>
        )}

        {step === STEPS.LOGGED && (
          <div className="pl-11">
            <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid #f0f0f0' }}>
              <p className="text-sm text-primary leading-relaxed mb-4">
                Your enquiry has been logged. Your reference is{' '}
                <strong className="text-on-background">{enquiryRef}</strong>.
              </p>
              <div className="p-4 rounded-xl space-y-2" style={{ background: '#f3f3f3', borderLeft: '4px solid #755b00' }}>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">What happens next?</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Our team will review your enquiry and contact you within 1 business day at{' '}
                  <strong>{contactEmail || 'your registered email'}</strong>.
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="mt-4 w-full py-2.5 text-sm font-medium text-white rounded-lg transition-all"
                style={{ background: '#5f5e5e' }}
              >
                Return to Home
              </button>
            </div>
          </div>
        )}

        {step === STEPS.OUT_OF_SCOPE && (
          <div className="pl-11 space-y-3">
            <BotBubble>
              I&apos;m sorry, I wasn&apos;t able to categorise your matter automatically. Please select from the areas we handle, or contact us directly.
            </BotBubble>
            <div className="flex flex-wrap gap-2">
              {LEGAL_AREAS.map((a) => (
                <ChoiceButton
                  key={a}
                  variant="outline"
                  onClick={() => {
                    setDetectedArea(a)
                    addUser(a)
                    setTimeout(() => setStep(STEPS.AREA_CONFIRM), 400)
                  }}
                >
                  {a}
                </ChoiceButton>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>
    </div>
  )
}
