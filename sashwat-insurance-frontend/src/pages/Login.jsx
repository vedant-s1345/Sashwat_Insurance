import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Auth.module.css'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form,  setForm]  = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await login({ email: form.email, password: form.password })
    if (res.ok) navigate(from, { replace: true })
    else setError(res.message)
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <img src="/logo.png" alt="Shashwat Insurance Services" className={styles.leftLogo} />
          <h2 className={styles.leftTitle}>Shashwat Insurance Services</h2>
          <p className={styles.leftSub}>Your trusted partner for Life, Health & General Insurance</p>
          <div className={styles.leftPartners}>
            {['TATA AIA', 'Star Health', 'ICICI Lombard', 'Go Digit', 'Niva Bupa', 'Care Health', 'Royal Sundaram', 'TATA AIG'].map(p => (
              <span key={p} className={styles.leftPartnerTag}>{p}</span>
            ))}
          </div>
          <a href="https://www.instagram.com/insurewithsamartth" target="_blank" rel="noopener noreferrer" className={styles.leftInsta}>
            📷 @insurewithsamartth
          </a>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Welcome back</h1>
            <p className={styles.cardSub}>Sign in to your account</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="field">
              <label>Email Address</label>
              <input type="email" required autoComplete="email" placeholder="you@example.com"
                value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" required autoComplete="current-password" placeholder="••••••••"
                value={form.password} onChange={e => set('password', e.target.value)} />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <div className={styles.demo}>
            <span className={styles.demoLabel}>Demo admin credentials</span>
            <code>admin@sashwatinsurance.com / Admin@123</code>
          </div>

          <p className={styles.switch}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.switchLink}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
