import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteModal from '../ui/QuoteModal.jsx'
import styles from './HeroSection.module.css'

const STATS = [
  { value: '500+',   label: 'Happy Clients' },
  { value: '8',      label: 'Partner Insurers' },
  { value: '3',      label: 'Insurance Categories' },
  { value: '100%',   label: 'Trusted Guidance' },
]

const SERVICES = [
  { icon: '🛡️', label: 'Life Insurance',    desc: 'TATA AIA, and more' },
  { icon: '🏥', label: 'Health Insurance',  desc: 'Star Health, Care, Niva Bupa' },
  { icon: '🚗', label: 'General Insurance', desc: 'TATA AIG, ICICI Lombard, Go Digit' },
]

export default function HeroSection() {
  const [modalOpen, setModal] = useState(false)

  return (
    <section className={styles.hero}>
      <div className={styles.bgGeom}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.gridLines} />
      </div>

      <div className={`container ${styles.inner}`}>

        {/* Left */}
        <div className={styles.left}>
          <div className="animate-fade-up">
            <span className="section-tag">IRDAI Approved Partners · Est. 2024</span>
          </div>

          <h1 className={`${styles.headline} animate-fade-up delay-100`}>
            Insurance that{' '}
            <em className={styles.italic}>truly</em>{' '}
            <span className="shimmer-gold">protects you.</span>
          </h1>

          <p className={`${styles.sub} animate-fade-up delay-200`}>
            Shashwat Insurance Services partners with India's top insurers to bring you
            Life, Health and General Insurance plans — with honest advice, zero pressure.
          </p>

          <div className={`${styles.ctas} animate-fade-up delay-300`}>
            <button className="btn btn-gold btn-lg" onClick={() => setModal(true)}>
              Get Free Consultation
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
            <Link to="/calculator" className="btn btn-outline btn-lg" style={{ color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.3)' }}>
              Calculate Premium
            </Link>
          </div>

          <div className={`${styles.services} animate-fade-up delay-400`}>
            {SERVICES.map(s => (
              <div key={s.label} className={styles.serviceChip}>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <div>
                  <div className={styles.serviceLabel}>{s.label}</div>
                  <div className={styles.serviceDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Owner card */}
        <div className={`${styles.right} animate-fade-up delay-200`}>
          <div className={styles.ownerCard}>
            <div className={styles.ownerImgWrap}>
              <img src="/owner.png" alt="Founder, Shashwat Insurance Services" className={styles.ownerImg} />
              <div className={styles.ownerBadge}>
                <span className={styles.ownerBadgeIcon}>✦</span>
                <span>Expert Advisor</span>
              </div>
            </div>
            <div className={styles.ownerInfo}>
              <div className={styles.ownerName}>Shashwat Insurance Services</div>
              <div className={styles.ownerTitle}>Your Trusted Insurance Partner</div>
              <div className={styles.ownerPartners}>
                {['TATA AIA', 'ICICI Lombard', 'Star Health', 'Go Digit'].map(p => (
                  <span key={p} className={styles.ownerPartnerTag}>{p}</span>
                ))}
                <span className={styles.ownerPartnerTag}>+4 more</span>
              </div>
              <a
                href="https://www.instagram.com/insurewithsamartth"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instaBtn}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                @insurewithsamartth
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
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
