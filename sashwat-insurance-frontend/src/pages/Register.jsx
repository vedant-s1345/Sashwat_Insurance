import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Auth.module.css'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const [form,  setForm]  = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm)           { setError('Passwords do not match.'); return }
    if (form.password.length < 8)                 { setError('Password must be at least 8 characters.'); return }
    if (!/^[6-9]\d{9}$/.test(form.phone))         { setError('Enter a valid 10-digit Indian mobile number.'); return }

    const res = await register({
      fullName: form.fullName.trim(),
      email:    form.email.trim(),
      phone:    form.phone.trim(),
      password: form.password,
    })
    if (res.ok) navigate('/dashboard', { replace: true })
    else setError(res.message)
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <img src="/logo.png" alt="Shashwat Insurance Services" className={styles.leftLogo} />
          <h2 className={styles.leftTitle}>Join Shashwat Insurance Services</h2>
          <p className={styles.leftSub}>Get expert insurance guidance and instant quotes from top insurers</p>
          <div className={styles.leftBullets}>
            {[
              '✓ Free consultation with our experts',
              '✓ Compare plans from 8 top insurers',
              '✓ Instant premium calculator',
              '✓ Hassle-free claim support',
              '✓ Career opportunities in insurance',
            ].map(b => <div key={b} className={styles.bullet}>{b}</div>)}
          </div>
          <a href="https://www.instagram.com/insurewithsamartth" target="_blank" rel="noopener noreferrer" className={styles.leftInsta}>
            📷 @insurewithsamartth
          </a>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Create your account</h1>
            <p className={styles.cardSub}>Get started with Shashwat Insurance Services</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input required placeholder="Your full name"
                value={form.fullName} onChange={e => set('fullName', e.target.value)} />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" required placeholder="you@example.com"
                value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="field">
              <label>Mobile Number (+91)</label>
              <input type="tel" required maxLength={10} placeholder="10-digit number"
                value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" required minLength={8} placeholder="Min. 8 characters"
                value={form.password} onChange={e => set('password', e.target.value)} />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input type="password" required placeholder="Repeat password"
                value={form.confirm} onChange={e => set('confirm', e.target.value)} />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={`btn btn-gold ${styles.submit}`} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>

          <p className={styles.switch}>
            Already have an account?{' '}
            <Link to="/login" className={styles.switchLink}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
