import { useState } from 'react'
import { leadsApi } from '../../api/client.js'
import styles from './QuoteModal.module.css'

const STEPS = ['Details', 'Coverage', 'Confirm']

const LEAD_TYPES = [
  { val: 'QUOTE_REQUEST',   label: 'Get a Quote' },
  { val: 'CALLBACK_REQUEST',label: 'Request Callback' },
  { val: 'CONTACT_FORM',   label: 'General Inquiry' },
]
const GENDERS = [
  { val: 'MALE',   label: 'Male' },
  { val: 'FEMALE', label: 'Female' },
  { val: 'OTHER',  label: 'Other' },
]
const HEALTH = [
  { val: 'EXCELLENT', label: 'Excellent' },
  { val: 'GOOD',      label: 'Good' },
  { val: 'AVERAGE',   label: 'Average' },
  { val: 'POOR',      label: 'Poor' },
]

function formatCoverage(v) {
  const n = Number(v)
  if (n >= 10_000_000) return `₹${n/10_000_000} Cr`
  if (n >= 100_000) return `₹${n/100_000} L`
  return `₹${n.toLocaleString('en-IN')}`
}

export default function QuoteModal({ onClose, product }) {
  const [step,    setStep]    = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error,   setError]   = useState('')

  const [form, setForm] = useState({
    fullName:               '',
    email:                  '',
    phone:                  '',
    leadType:               'QUOTE_REQUEST',
    productId:              product?.id || '',
    age:                    '',
    gender:                 'MALE',
    policyTermYears:        '20',
    coverageAmountRequested:'5000000',
    healthStatus:           'GOOD',
    message:                '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setLoading(true); setError('')
    try {
      const payload = {
        fullName:   form.fullName.trim(),
        email:      form.email.trim(),
        phone:      form.phone.trim(),
        leadType:   form.leadType,
        ...(form.productId           && { productId: Number(form.productId) }),
        ...(form.age                 && { age: Number(form.age) }),
        gender:     form.gender,
        ...(form.policyTermYears     && { policyTermYears: Number(form.policyTermYears) }),
        ...(form.coverageAmountRequested && { coverageAmountRequested: Number(form.coverageAmountRequested) }),
        healthStatus: form.healthStatus,
        ...(form.message             && { message: form.message }),
      }
      const res = await leadsApi.create(payload)
      setSuccess(res.data.data)
    } catch (e) {
      setError(e.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const validStep0 = form.fullName.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && /^[6-9]\d{9}$/.test(form.phone)
  const validStep1 = form.age && Number(form.age) >= 18 && Number(form.age) <= 70

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              {success ? 'Quote Requested! 🎉' : product ? `Quote for ${product.name}` : 'Get Your Free Quote'}
            </h2>
            {!success && <p className={styles.subtitle}>Our advisors will contact you within 24 hours.</p>}
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Success */}
        {success ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✅</div>
            <p className={styles.successMsg}>Thank you, <strong>{form.fullName.split(' ')[0]}</strong>!</p>
            <p className={styles.successSub}>Our team will call you within 24 hours. Reference: <strong>{success.referenceId}</strong></p>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: 24 }}>Close</button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className={styles.progress}>
              {STEPS.map((s, i) => (
                <div key={s} className={`${styles.progressStep} ${i <= step ? styles.progressActive : ''}`}>
                  <div className={styles.progressDot}>{i < step ? '✓' : i + 1}</div>
                  <span className={styles.progressLabel}>{s}</span>
                  {i < STEPS.length - 1 && <div className={`${styles.progressLine} ${i < step ? styles.progressLineFill : ''}`} />}
                </div>
              ))}
            </div>

            <div className={styles.body}>

              {/* Step 0 — Personal Details */}
              {step === 0 && (
                <div className={styles.stepContent}>
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

              {/* Step 1 — Coverage Details */}
              {step === 1 && (
                <div className={styles.stepContent}>
                  <div className={styles.row2}>
                    <div className="field">
                      <label>Your Age *</label>
                      <input type="number" min={18} max={70} placeholder="30" value={form.age} onChange={e => set('age', e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Gender</label>
                      <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                        {GENDERS.map(g => <option key={g.val} value={g.val}>{g.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Coverage Amount — {formatCoverage(form.coverageAmountRequested)}</label>
                    <input
                      type="range" min={500000} max={10000000} step={500000}
                      value={form.coverageAmountRequested}
                      onChange={e => set('coverageAmountRequested', e.target.value)}
                      style={{ width: '100%', accentColor: 'var(--gold)' }}
                    />
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>₹5 Lakh</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>₹1 Crore</span>
                    </div>
                  </div>
                  <div className={styles.row2}>
                    <div className="field">
                      <label>Policy Term (years)</label>
                      <input type="number" min={5} max={40} value={form.policyTermYears} onChange={e => set('policyTermYears', e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Health Status</label>
                      <select value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)}>
                        {HEALTH.map(h => <option key={h.val} value={h.val}>{h.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Message (optional)</label>
                    <textarea rows={3} placeholder="Any specific requirements or questions?" value={form.message} onChange={e => set('message', e.target.value)} style={{ resize:'vertical' }} />
                  </div>
                </div>
              )}

              {/* Step 2 — Confirm */}
              {step === 2 && (
                <div className={styles.stepContent}>
                  <div className={styles.summary}>
                    {[
                      ['Name',      form.fullName],
                      ['Email',     form.email],
                      ['Phone',     '+91 ' + form.phone],
                      ['Age',       form.age + ' years'],
                      ['Gender',    form.gender],
                      ['Coverage',  formatCoverage(form.coverageAmountRequested)],
                      ['Term',      form.policyTermYears + ' years'],
                      ['Health',    form.healthStatus],
                    ].map(([k, v]) => v && (
                      <div key={k} className={styles.summaryRow}>
                        <span className={styles.summaryKey}>{k}</span>
                        <span className={styles.summaryVal}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className={styles.consentNote}>
                    By submitting, you consent to Sashwat Insurance contacting you via phone/email. Your data is secure and never sold to third parties.
                  </p>
                </div>
              )}

              {error && <p className={styles.error}>{error}</p>}

              {/* Navigation */}
              <div className={styles.nav}>
                {step > 0 && (
                  <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
                )}
                {step < 2 ? (
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setStep(s => s + 1)}
                    disabled={step === 0 ? !validStep0 : !validStep1}
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    className="btn btn-gold"
                    style={{ marginLeft: 'auto' }}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
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
