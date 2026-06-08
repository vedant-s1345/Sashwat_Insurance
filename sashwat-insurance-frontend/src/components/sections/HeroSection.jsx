import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteModal from '../ui/QuoteModal.jsx'
import styles from './HeroSection.module.css'

const STATS = [
  { value: '50,000+', label: 'Families Protected' },
  { value: '₹2,800Cr', label: 'Claims Paid' },
  { value: '99.5%', label: 'Claim Settlement' },
  { value: '6+', label: 'Product Plans' },
]

export default function HeroSection() {
  const [modalOpen, setModal] = useState(false)

  return (
    <section className={styles.hero}>
      {/* Background geometry */}
      <div className={styles.bgGeom}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.gridLines} />
      </div>

      <div className={`container ${styles.inner}`}>

        {/* ── Left Column ── */}
        <div className={styles.left}>
          <div className="animate-fade-up">
            <span className="section-tag">IRDAI Approved · Trusted Since 2024</span>
          </div>

          <h1 className={`${styles.headline} animate-fade-up delay-100`}>
            Insurance that{' '}
            <em className={styles.italic}>actually</em>{' '}
            <span className="shimmer-gold">works for you.</span>
          </h1>

          <p className={`${styles.sub} animate-fade-up delay-200`}>
            Compare top-rated life, ULIP, pension and child plans. Instant premium quotes, transparent pricing — no agents, no hidden charges.
          </p>

          <div className={`${styles.ctas} animate-fade-up delay-300`}>
            <button className="btn btn-gold" onClick={() => setModal(true)}>
              Get Free Quote
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            <Link to="/calculator" className="btn btn-outline">
              Calculate Premium
            </Link>
          </div>

          <div className={`${styles.trust} animate-fade-up delay-400`}>
            <span className={styles.trustItem}>✓ 100% Online</span>
            <span className={styles.trustItem}>✓ Instant Issuance</span>
            <span className={styles.trustItem}>✓ Section 80C Benefits</span>
          </div>
        </div>

        {/* ── Right Column — Hero Card ── */}
        <div className={`${styles.right} animate-fade-up delay-200`}>
          <div className={styles.heroCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 36 40" fill="none" width="32" height="36">
                  <path d="M18 2 L34 9 L34 24 Q34 36 18 42 Q2 36 2 24 L2 9 Z" fill="rgba(201,168,76,.15)" stroke="#c9a84c" strokeWidth="2"/>
                  <path d="M11 21 L16 26 L26 14" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className={styles.cardTitle}>Your family, protected.</div>
                <div className={styles.cardSub}>Life coverage starting at ₹420/month</div>
              </div>
            </div>

            <div className={styles.planGrid}>
              {[
                { name: 'Term Shield',   type: 'TERM LIFE',    premium: '₹420/mo', cover: '₹1 Cr' },
                { name: 'Whole Life',    type: 'WHOLE LIFE',   premium: '₹900/mo', cover: '₹50 L' },
                { name: 'ULIP Growth',   type: 'MARKET-LINKED',premium: '₹650/mo', cover: '₹50 L' },
                { name: 'Pension Secure',type: 'PENSION',      premium: '₹550/mo', cover: '₹50 L' },
              ].map(p => (
                <div key={p.name} className={styles.planItem}>
                  <div className={styles.planName}>{p.name}</div>
                  <span className={`badge badge-gold ${styles.planType}`}>{p.type}</span>
                  <div className={styles.planPremium}>{p.premium}</div>
                  <div className={styles.planCover}>Cover: {p.cover}</div>
                </div>
              ))}
            </div>

            <button className={`btn btn-primary ${styles.cardCta}`} onClick={() => setModal(true)}>
              Get My Personalized Quote →
            </button>

            <p className={styles.cardNote}>🔒 Your data is encrypted and never shared.</p>
          </div>

          
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && <QuoteModal onClose={() => setModal(false)} />}
    </section>
  )
}
