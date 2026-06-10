import { useState } from 'react'
import { leadsApi } from '../../api/client.js'
import styles from './QuoteModal.module.css'

const LEAD_TYPES = [
  { val: 'QUOTE_REQUEST',    label: 'Get a Quote' },
  { val: 'CALLBACK_REQUEST', label: 'Request Callback' },
  { val: 'CONTACT_FORM',    label: 'General Inquiry' },
]

const INSURANCE_TYPES = [
  { val: 'Life Insurance',    label: '🛡️ Life Insurance' },
  { val: 'Health Insurance',  label: '🏥 Health Insurance' },
  { val: 'General Insurance', label: '🚗 General Insurance' },
]

export default function QuoteModal({ onClose, product }) {
  const [step,    setStep]    = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const [form, setForm] = useState({
    fullName:    '',
    email:       '',
    phone:       '',
    leadType:    'QUOTE_REQUEST',
    insuranceType: product?.title || '',
    age:         '',
    message:     '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validStep0 = form.fullName.trim().length >= 2
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    && /^[6-9]\d{9}$/.test(form.phone)

  const handleSubmit = async () => {
    setLoading(true); setError('')
    try {
      await leadsApi.create({
        fullName: form.fullName.trim(),
        email:    form.email.trim(),
        phone:    form.phone.trim(),
        leadType: form.leadType,
        age:      form.age ? Number(form.age) : undefined,
        message:  `Insurance Type: ${form.insuranceType || 'Not specified'}. ${form.message}`.trim(),
      })
      setSuccess(true)
    } catch (e) {
      setError(e.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <img src="/logo.png" alt="SIS" className={styles.headerLogo} />
            <div>
              <h2 className={styles.title}>
                {success ? 'Request Submitted! 🎉' : product ? `${product.title} Quote` : 'Get Free Consultation'}
              </h2>
              {!success && <p className={styles.subtitle}>Shashwat Insurance Services</p>}
            </div>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {success ? (
          /* ── Success ── */
          <div className={styles.success}>
            <div className={styles.successCircle}>✓</div>
            <p className={styles.successMsg}>Thank you, <strong>{form.fullName.split(' ')[0]}</strong>!</p>
            <p className={styles.successSub}>
              Our expert advisor will call you within 24 hours to discuss the best insurance plan for your needs.
            </p>
            <div className={styles.successPartners}>
              <span className={styles.successPartnersLabel}>We'll compare plans from:</span>
              {['TATA AIA', 'Star Health', 'ICICI Lombard', 'Go Digit'].map(p => (
                <span key={p} className={styles.successPartnerChip}>{p}</span>
              ))}
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: 24 }}>Close</button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className={styles.progress}>
              {['Your Details', 'Insurance Need', 'Confirm'].map((s, i) => (
                <div key={s} className={`${styles.progressStep} ${i <= step ? styles.progressActive : ''}`}>
                  <div className={styles.progressDot}>{i < step ? '✓' : i + 1}</div>
                  <span className={styles.progressLabel}>{s}</span>
                  {i < 2 && <div className={`${styles.progressLine} ${i < step ? styles.progressLineFill : ''}`} />}
                </div>
              ))}
            </div>

            <div className={styles.body}>

              {/* Step 0 — Contact */}
              {step === 0 && (
                <div>
                  <div className="field">
                    <label>Full Name *</label>
                    <input placeholder="Priya Sharma" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Email Address *</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Mobile Number * (+91)</label>
                    <input type="tel" placeholder="9876543210" maxLength={10} value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g,''))} />
                  </div>
                  <div className="field">
                    <label>I want to</label>
                    <select value={form.leadType} onChange={e => set('leadType', e.target.value)}>
                      {LEAD_TYPES.map(t => <option key={t.val} value={t.val}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 1 — Insurance type */}
              {step === 1 && (
                <div>
                  <div className="field">
                    <label>Insurance Category</label>
                    <div className={styles.typeGrid}>
                      {INSURANCE_TYPES.map(t => (
                        <button
                          key={t.val}
                          type="button"
                          className={`${styles.typeBtn} ${form.insuranceType === t.val ? styles.typeBtnActive : ''}`}
                          onClick={() => set('insuranceType', t.val)}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label>Your Age</label>
                    <input type="number" min={18} max={80} placeholder="e.g. 30" value={form.age} onChange={e => set('age', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Any specific requirements?</label>
                    <textarea rows={3} placeholder="Coverage amount, budget, specific plans you're interested in..."
                      value={form.message} onChange={e => set('message', e.target.value)} style={{ resize: 'vertical' }} />
                  </div>
                </div>
              )}

              {/* Step 2 — Confirm */}
              {step === 2 && (
                <div>
                  <div className={styles.summary}>
                    {[
                      ['Name',               form.fullName],
                      ['Email',              form.email],
                      ['Phone',              '+91 ' + form.phone],
                      ['Request Type',       LEAD_TYPES.find(t => t.val === form.leadType)?.label],
                      ['Insurance Category', form.insuranceType || 'Not specified'],
                      ['Age',                form.age ? form.age + ' years' : '—'],
                    ].map(([k, v]) => v && (
                      <div key={k} className={styles.summaryRow}>
                        <span className={styles.summaryKey}>{k}</span>
                        <span className={styles.summaryVal}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className={styles.consentNote}>
                    By submitting, you agree to be contacted by Shashwat Insurance Services. Your information is secure and never shared with third parties.
                  </p>
                </div>
              )}

              {error && <p className={styles.error}>{error}</p>}

              {/* Nav */}
              <div className={styles.nav}>
                {step > 0 && (
                  <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
                )}
                {step < 2 ? (
                  <button className="btn btn-primary" style={{ marginLeft: 'auto' }}
                    onClick={() => setStep(s => s + 1)}
                    disabled={step === 0 ? !validStep0 : false}>
                    Next →
                  </button>
                ) : (
                  <button className="btn btn-gold" style={{ marginLeft: 'auto' }}
                    onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting…' : 'Submit Request →'}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
