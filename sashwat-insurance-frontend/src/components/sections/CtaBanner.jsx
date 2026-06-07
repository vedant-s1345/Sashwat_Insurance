import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteModal from '../ui/QuoteModal.jsx'
import styles from './CtaBanner.module.css'

export default function CtaBanner() {
  const [modal, setModal] = useState(false)
  return (
    <section className={styles.banner}>
      <div className={styles.bg}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className="section-tag" style={{ color: 'var(--gold)', background: 'rgba(201,168,76,.12)', borderColor: 'rgba(201,168,76,.2)' }}>
            Limited Time
          </span>
          <h2 className={styles.heading}>
            Get ₹1 Crore coverage<br />
            <span className={styles.highlight}>from ₹490/month.</span>
          </h2>
          <p className={styles.sub}>
            Secure your family's future today. Instant issuance, zero paperwork, 100% online.
          </p>
        </div>

        <div className={styles.right}>
          <button className={`btn btn-gold ${styles.cta}`} onClick={() => setModal(true)}>
            Get My Free Quote →
          </button>
          <Link to="/calculator" className={`btn ${styles.ctaAlt}`}>
            Calculate Premium
          </Link>
          <p className={styles.note}>No credit card • No spam calls • Cancel anytime</p>
        </div>
      </div>

      {modal && <QuoteModal onClose={() => setModal(false)} />}
    </section>
  )
}
