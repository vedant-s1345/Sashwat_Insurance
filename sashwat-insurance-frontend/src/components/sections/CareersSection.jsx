import { useState } from 'react'
import { leadsApi } from '../../api/client.js'
import styles from './CareersSection.module.css'

const ROLES = [
  { title: 'Life Insurance Advisor', type: 'Life Insurance', desc: 'Help clients choose the right life insurance plans. Build long-term relationships and grow a rewarding portfolio.' },
  { title: 'Health Insurance Agent', type: 'Health Insurance', desc: 'Guide individuals and families to the best health coverage. Work with Star Health, Care Health, and Niva Bupa.' },
  { title: 'General Insurance Executive', type: 'General Insurance', desc: 'Handle motor, travel, and property insurance. Work with TATA AIG, ICICI Lombard, Go Digit, and Royal Sundaram.' },
  { title: 'Team Leader / Branch Manager', type: 'Leadership', desc: 'Lead a team of insurance advisors. Grow your own agency with full support from Shashwat Insurance Services.' },
]

const PERKS = [
  { icon: '💰', title: 'Unlimited Earning', desc: 'Commission-based + incentives. Your income grows with your performance — no ceiling.' },
  { icon: '🎓', title: 'Free Training', desc: 'Complete IRDAI licensing support, product training and sales mentorship provided.' },
  { icon: '🕒', title: 'Flexible Hours', desc: 'Work at your own pace. Full-time, part-time, or as a side income — your choice.' },
  { icon: '📈', title: 'Career Growth', desc: 'From advisor to team leader to branch manager. Clear growth path with regular promotions.' },
  { icon: '🤝', title: 'Top Brand Partners', desc: 'Sell products from TATA AIA, Star Health, ICICI Lombard and 5 more trusted brands.' },
  { icon: '🏆', title: 'Recognition & Rewards', desc: 'Monthly incentives, annual trips, awards. Your hard work is always celebrated.' },
]

export default function CareersSection() {
  const [form, setForm]       = useState({ fullName: '', email: '', phone: '', role: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleApply = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await leadsApi.create({
        fullName: form.fullName.trim(),
        email:    form.email.trim(),
        phone:    form.phone.trim(),
        leadType: 'CONTACT_FORM',
        message:  `CAREER APPLICATION — Role: ${form.role || 'General'}. ${form.message}`,
      })
      setSuccess(true)
    } catch (e) {
      setError(e.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.section} id="careers">
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <span className="section-tag">Join Our Team</span>
          <h2 className="section-heading">Build your career in insurance</h2>
          <p className="section-sub" style={{ margin: '0 auto 16px' }}>
            Shashwat Insurance Services is expanding. We're looking for motivated individuals to join our growing team across Life, Health and General Insurance.
          </p>
          <div className="gold-divider center" />
        </div>

        {/* Perks */}
        <div className={styles.perksGrid}>
          {PERKS.map(p => (
            <div key={p.title} className={styles.perk}>
              <span className={styles.perkIcon}>{p.icon}</span>
              <div>
                <div className={styles.perkTitle}>{p.title}</div>
                <div className={styles.perkDesc}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Roles + Form */}
        <div className={styles.layout}>

          {/* Open Roles */}
          <div className={styles.roles}>
            <h3 className={styles.rolesHead}>Open Positions</h3>
            {ROLES.map(r => (
              <div key={r.title} className={styles.roleCard}>
                <div className={styles.roleTop}>
                  <div className={styles.roleTitle}>{r.title}</div>
                  <span className={styles.roleType}>{r.type}</span>
                </div>
                <p className={styles.roleDesc}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className={styles.formWrap}>
            <div className={styles.formCard}>
              <h3 className={styles.formHead}>Apply Now</h3>
              <p className={styles.formSub}>Fill this form and our team will reach out within 24 hours.</p>

              {success ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>🎉</div>
                  <p className={styles.successTitle}>Application Received!</p>
                  <p className={styles.successMsg}>Thank you for your interest. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <div className="field">
                    <label>Full Name *</label>
                    <input required placeholder="Your full name" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Email *</label>
                    <input type="email" required placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Mobile Number *</label>
                    <input type="tel" required maxLength={10} placeholder="10-digit mobile number" value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} />
                  </div>
                  <div className="field">
                    <label>Role Interested In</label>
                    <select value={form.role} onChange={e => set('role', e.target.value)}>
                      <option value="">Select a role</option>
                      {ROLES.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                      <option value="Any">Open to any role</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Tell us about yourself</label>
                    <textarea rows={3} placeholder="Brief background, experience, why you want to join..." value={form.message} onChange={e => set('message', e.target.value)} style={{ resize: 'vertical' }} />
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                  <button type="submit" className={`btn btn-gold ${styles.submitBtn}`} disabled={loading}>
                    {loading ? 'Submitting…' : 'Submit Application →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
