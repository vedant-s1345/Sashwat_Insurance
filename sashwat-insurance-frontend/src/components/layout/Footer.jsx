import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const SERVICES = [
  { label: 'Life Insurance',    to: '/products' },
  { label: 'Health Insurance',  to: '/products' },
  { label: 'General Insurance', to: '/products' },
  { label: 'Premium Calculator',to: '/calculator' },
  { label: 'Career Opportunities', to: '/careers' },
]

const PARTNERS = [
  'TATA AIA Life Insurance', 'TATA AIG', 'ICICI Lombard',
  'Star Health Insurance', 'Care Health Insurance',
  'Go Digit', 'Royal Sundaram', 'Niva Bupa',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <img src="/logo.png" alt="SIS" className={styles.logoImg} />
            <span className={styles.brandName}>Shashwat Insurance Services</span>
          </div>
          <p className={styles.tagline}>
            Your trusted insurance partner. We connect you with India's leading insurers for Life, Health and General Insurance — with honest, expert guidance.
          </p>
          <a href="https://www.instagram.com/insurewithsamartth" target="_blank" rel="noopener noreferrer" className={styles.insta}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @insurewithsamartth
          </a>
          <div className={styles.reg}>
            <span>IRDAI Approved Insurance Broker</span>
            <span>Contact: [Phone — coming soon]</span>
            <span>Email: [Email — coming soon]</span>
          </div>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Services</h4>
          <ul className={styles.list}>
            {SERVICES.map(s => (
              <li key={s.label}><Link to={s.to} className={styles.footLink}>{s.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Partners */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Our Partners</h4>
          <ul className={styles.list}>
            {PARTNERS.map(p => (
              <li key={p} className={styles.partnerItem}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Quick Links</h4>
          <ul className={styles.list}>
            {[
              { label: 'Get a Quote',     to: '/register' },
              { label: 'Calculator',      to: '/calculator' },
              { label: 'Join Our Team',   to: '/careers' },
              { label: 'Login',           to: '/login' },
            ].map(l => (
              <li key={l.label}><Link to={l.to} className={styles.footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copy}>© {new Date().getFullYear()} Shashwat Insurance Services. All rights reserved.</p>
            <p className={styles.disclaimer}>Insurance is the subject matter of solicitation. IRDAI Registration details available on request.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
