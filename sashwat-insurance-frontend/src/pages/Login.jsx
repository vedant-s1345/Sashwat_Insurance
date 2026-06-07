import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Auth.module.css'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await login({ email: form.email, password: form.password })
    if (res.ok) {
      navigate(from, { replace: true })
    } else {
      setError(res.message)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Brand */}
        <div className={styles.brand}>
          <svg viewBox="0 0 36 40" fill="none" width="40" height="44">
            <path d="M18 2 L34 9 L34 24 Q34 36 18 42 Q2 36 2 24 L2 9 Z" fill="#0a1628" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M11 21 L16 26 L26 14" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <div className={styles.brandName}>Sashwat Insurance</div>
            <div className={styles.brandSub}>Sign in to your account</div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => set('password', e.target.value)}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className={styles.demo}>
          <span className={styles.demoLabel}>Demo credentials (admin):</span>
          <code>admin@sashwatinsurance.com / Admin@123</code>
        </div>

        <p className={styles.switch}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.switchLink}>Create one →</Link>
        </p>
      </div>
    </div>
  )
}
