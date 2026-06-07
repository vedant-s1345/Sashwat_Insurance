import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import styles from './Navbar.module.css'

const NAV = [
  { label: 'Products', to: '/products' },
  { label: 'Calculator', to: '/calculator' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobile]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>

          {/* ── Logo ── */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>
              <svg viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2 L34 9 L34 24 Q34 36 18 42 Q2 36 2 24 L2 9 Z" fill="#0a1628" stroke="#c9a84c" strokeWidth="1.5"/>
                <path d="M11 21 L16 26 L26 14" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoName}>Sashwat</span>
              <span className={styles.logoSub}>Insurance</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className={styles.links}>
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                {n.label}
              </NavLink>
            ))}
          </div>

          {/* ── Auth Actions ── */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                <span className={styles.greeting}>Hi, {user?.fullName?.split(' ')[0]}</span>
                <Link to="/dashboard" className={`btn btn-outline ${styles.dashBtn}`}>Dashboard</Link>
                <button className={`btn btn-ghost ${styles.logoutBtn}`} onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"    className={`btn btn-outline ${styles.loginBtn}`}>Login</Link>
                <Link to="/register" className={`btn btn-gold  ${styles.registerBtn}`}>Get Started</Link>
              </>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button className={styles.hamburger} onClick={() => setMobile(v => !v)} aria-label="Menu">
            <span className={`${styles.bar} ${mobileOpen ? styles.open1 : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.open2 : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.open3 : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className={styles.drawer} onClick={() => setMobile(false)}>
          <div className={styles.drawerInner} onClick={e => e.stopPropagation()}>
            {NAV.map(n => (
              <Link key={n.to} to={n.to} className={styles.drawerLink} onClick={() => setMobile(false)}>
                {n.label}
              </Link>
            ))}
            <div className={styles.drawerActions}>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-outline" onClick={() => setMobile(false)}>Dashboard</Link>
                  <button className="btn btn-ghost" onClick={() => { handleLogout(); setMobile(false) }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login"    className="btn btn-outline" onClick={() => setMobile(false)}>Login</Link>
                  <Link to="/register" className="btn btn-gold"    onClick={() => setMobile(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
