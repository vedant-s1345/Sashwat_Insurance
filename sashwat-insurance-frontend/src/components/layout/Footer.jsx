import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const LINKS = {
  Products: [
    { label: 'Term Life Insurance', to: '/products#term' },
    { label: 'Whole Life Plan', to: '/products#whole-life' },
    { label: 'ULIP Growth Fund', to: '/products#ulip' },
    { label: 'Endowment Plus', to: '/products#endowment' },
    { label: 'Child Future Plan', to: '/products#child' },
    { label: 'Pension Secure', to: '/products#pension' },
  ],
  Company: [
    { label: 'About Us', to: '/#about' },
    { label: 'Careers', to: '/#careers' },
    { label: 'Press & Media', to: '/#press' },
    { label: 'Investor Relations', to: '/#investors' },
  ],
  Support: [
    { label: 'Help Center', to: '/#help' },
    { label: 'Claims Assistance', to: '/#claims' },
    { label: 'Policy Renewal', to: '/#renewal' },
    { label: 'Contact Us', to: '/#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/#privacy' },
    { label: 'Terms of Service', to: '/#terms' },
    { label: 'Cookie Policy', to: '/#cookies' },
    { label: 'Disclaimer', to: '/#disclaimer' },
  ],
}

const PARTNERS = ['HDFC Life', 'Max Life', 'ICICI Pru', 'SBI Life', 'Tata AIA', 'Bajaj Allianz']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* ── Brand Column ── */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <svg viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="36">
              <path d="M18 2 L34 9 L34 24 Q34 36 18 42 Q2 36 2 24 L2 9 Z" fill="#c9a84c" stroke="#c9a84c" strokeWidth="1"/>
              <path d="M11 21 L16 26 L26 14" stroke="#0a1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.brandName}>Sashwat Insurance</span>
          </div>
          <p className={styles.tagline}>
            Protecting what matters most — your family's future — with transparent, IRDAI-compliant life insurance plans.
          </p>
          <div className={styles.reg}>
            <span>IRDAI Reg. No: XXX-XXXX</span>
            <span>CIN: U65999MH2024PLC000000</span>
          </div>
          <div className={styles.partners}>
            <span className={styles.partnersLabel}>Trusted partners:</span>
            {PARTNERS.map(p => <span key={p} className={styles.partner}>{p}</span>)}
          </div>
        </div>

        {/* ── Link Columns ── */}
        {Object.entries(LINKS).map(([cat, items]) => (
          <div key={cat} className={styles.col}>
            <h4 className={styles.colHead}>{cat}</h4>
            <ul className={styles.list}>
              {items.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className={styles.footLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copy}>© {new Date().getFullYear()} Sashwat Insurance Pvt. Ltd. All rights reserved.</p>
            <p className={styles.disclaimer}>
              Insurance is the subject matter of solicitation. Please read the sales brochure carefully before concluding a sale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
