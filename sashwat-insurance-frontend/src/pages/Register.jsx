import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Auth.module.css'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]     = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError]   = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!/^[6-9]\d{9}$/.test(form.phone)) { setError('Enter a valid 10-digit Indian mobile number.'); return }

    const res = await register({
      fullName: form.fullName.trim(),
      email:    form.email.trim(),
      phone:    form.phone.trim(),
      password: form.password,
    })
    if (res.ok) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(res.message)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <svg viewBox="0 0 36 40" fill="none" width="40" height="44">
            <path d="M18 2 L34 9 L34 24 Q34 36 18 42 Q2 36 2 24 L2 9 Z" fill="#0a1628" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M11 21 L16 26 L26 14" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <div className={styles.brandName}>Sashwat Insurance</div>
            <div className={styles.brandSub}>Create your account</div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input required placeholder="Priya Sharma" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input type="email" required placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div className="field">
            <label>Mobile Number (+91)</label>
            <input type="tel" required maxLength={10} placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/,''))} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required minLength={8} placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input type="password" required placeholder="Repeat password" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
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
  )
}
