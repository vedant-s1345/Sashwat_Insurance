import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteModal from '../ui/QuoteModal.jsx'
import styles from './ProductsSection.module.css'

const CATEGORIES = [
  {
    id: 'life',
    icon: '🛡️',
    title: 'Life Insurance',
    tagline: `Protect your family's future`,
    color: '#1a5c2e', bg: '#e6f4ec',
    partners: ['TATA AIA Life Insurance'],
    plans: ['Term Life Insurance', 'Whole Life Plan', 'ULIP Growth Fund', 'Endowment Plus', 'Child Future Plan', 'Pension Secure'],
    features: ['High coverage at low premiums', 'Tax benefits under Section 80C', 'Flexible policy terms 10–40 yrs', 'Instant online issuance'],
    startingFrom: '₹420/month',
    desc: `Secure your family's financial future with comprehensive life insurance plans from TATA AIA. Get high coverage at affordable premiums with tax benefits under Section 80C.`,
  },
  {
    id: 'health',
    icon: '🏥',
    title: 'Health Insurance',
    tagline: 'Your health, fully covered',
    color: '#9b1c3a', bg: '#fdeef1',
    partners: ['Star Health', 'Care Health', 'Niva Bupa'],
    plans: ['Individual Health Plan', 'Family Floater', 'Senior Citizen Plan', 'Critical Illness Cover', 'Super Top-up'],
    features: ['Cashless treatment at 10,000+ hospitals', 'No-claim bonus up to 100%', 'Pre & post hospitalisation covered', 'Annual health check-up included'],
    startingFrom: '₹350/month',
    desc: `Stay protected against rising medical costs with health plans from Star Health, Care Health, and Niva Bupa. Cashless claims at thousands of hospitals across India.`,
  },
  {
    id: 'general',
    icon: '🚗',
    title: 'General Insurance',
    tagline: 'Protect your assets',
    color: '#1e3a7a', bg: '#eef1fa',
    partners: ['TATA AIG', 'ICICI Lombard', 'Go Digit', 'Royal Sundaram'],
    plans: ['Motor Insurance', 'Two-Wheeler Insurance', 'Travel Insurance', 'Home Insurance', 'Commercial Vehicle'],
    features: ['Instant policy issuance', 'Hassle-free claim settlement', 'Wide network of garages', 'Zero depreciation add-on'],
    startingFrom: '₹800/year',
    desc: `Protect your vehicles, travel and assets with general insurance from TATA AIG, ICICI Lombard, Go Digit and Royal Sundaram. Quick claims, zero hassle.`,
  },
]

export default function ProductsSection({ showAll = false }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className={styles.section}>
      <div className="container">
        {!showAll && (
          <div className={styles.header}>
            <span className="section-tag">Our Services</span>
            <h2 className="section-heading">Insurance for every need</h2>
            <p className="section-sub">
              Life, Health and General Insurance — all under one roof. Expert guidance, top-rated partners, transparent pricing.
            </p>
            <div className="gold-divider" />
          </div>
        )}

        <div className={styles.grid}>
          {CATEGORIES.map((cat, idx) => (
            <div key={cat.id} className={`${styles.card} animate-fade-up`} style={{ animationDelay: `${idx * 100}ms` }}>

              <div className={styles.cardTop}>
                <span className={styles.icon}>{cat.icon}</span>
                <div>
                  <div className={styles.partnerRow}>
                    {cat.partners.map(p => (
                      <span key={p} className={styles.partnerTag} style={{ color: cat.color, background: cat.bg }}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className={styles.title}>{cat.title}</h3>
              <p className={styles.tagline}>{cat.tagline}</p>
              <p className={styles.desc}>{cat.desc}</p>

              <ul className={styles.features}>
                {cat.features.map(f => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className={styles.plans}>
                <div className={styles.plansLabel}>Available plans:</div>
                <div className={styles.planTags}>
                  {cat.plans.slice(0, 3).map(p => (
                    <span key={p} className={styles.planTag}>{p}</span>
                  ))}
                  {cat.plans.length > 3 && (
                    <span className={styles.planTag}>+{cat.plans.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className={styles.meta}>
                <div>
                  <div className={styles.metaLabel}>Starting from</div>
                  <div className={styles.metaVal}>{cat.startingFrom}</div>
                </div>
                <div className={styles.cardActions}>
                  <button className="btn btn-primary" onClick={() => setSelected(cat)}>Get Quote</button>
                  <Link to="/calculator" className="btn btn-ghost" style={{ fontSize: 13 }}>Calculate →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
