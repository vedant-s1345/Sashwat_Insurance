import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsApi } from '../../api/client.js'
import QuoteModal from '../ui/QuoteModal.jsx'
import styles from './ProductsSection.module.css'

const TYPE_LABELS = {
  TERM_LIFE:       { label: 'Term Life',   color: '#0a1628', bg: '#e8edf5' },
  WHOLE_LIFE:      { label: 'Whole Life',  color: '#1a5c2e', bg: '#e6f4ec' },
  ENDOWMENT:       { label: 'Endowment',   color: '#7c2d12', bg: '#fef0e6' },
  ULIP:            { label: 'ULIP',        color: '#3730a3', bg: '#ededfd' },
  CHILD_PLAN:      { label: 'Child Plan',  color: '#be185d', bg: '#fde6f0' },
  PENSION_ANNUITY: { label: 'Pension',     color: '#a16207', bg: '#fefce8' },
  MONEY_BACK:      { label: 'Money Back',  color: '#065f46', bg: '#e6f7f2' },
}

const TYPE_ICON = {
  TERM_LIFE:       '🛡️',
  WHOLE_LIFE:      '🏛️',
  ENDOWMENT:       '🏦',
  ULIP:            '📈',
  CHILD_PLAN:      '👶',
  PENSION_ANNUITY: '🏖️',
  MONEY_BACK:      '💰',
}

// Fallback products to show when backend is offline
const FALLBACK = [
  { id:1, name:'Sashwat Term Shield',     productType:'TERM_LIFE',       description:'Pure protection plan offering high coverage at low premiums. Ideal for breadwinners who want maximum coverage without breaking the bank.', basePremiumRatePerLakh:420, minCoverageAmount:2500000, maxCoverageAmount:100000000, isFeatured:true },
  { id:2, name:'Sashwat Whole Life Plan', productType:'WHOLE_LIFE',      description:'Lifelong protection with a savings component up to age 99. Guaranteed maturity benefit with loan facility.',                               basePremiumRatePerLakh:900, minCoverageAmount:500000, maxCoverageAmount:50000000,  isFeatured:true },
  { id:3, name:'Sashwat ULIP Growth Fund',productType:'ULIP',            description:'Market-linked investments with life insurance protection. Choose from 4 fund options with partial withdrawal after 5 years.',              basePremiumRatePerLakh:650, minCoverageAmount:500000, maxCoverageAmount:50000000,  isFeatured:true },
  { id:4, name:'Sashwat Endowment Plus',  productType:'ENDOWMENT',       description:'Combined protection and savings plan with guaranteed maturity benefit. Ideal for disciplined long-term financial goals.',                   basePremiumRatePerLakh:750, minCoverageAmount:500000, maxCoverageAmount:20000000,  isFeatured:false },
  { id:5, name:'Sashwat Child Future Plan',productType:'CHILD_PLAN',     description:`Secure your child's future education and life goals. Premium waiver on parent's death with payouts at key milestones.`,                 basePremiumRatePerLakh:600, minCoverageAmount:500000, maxCoverageAmount:10000000,  isFeatured:false },
  { id:6, name:'Sashwat Pension Secure',  productType:'PENSION_ANNUITY', description:'Plan for a comfortable retirement with guaranteed monthly income. Return of purchase price on death with joint life annuity option.',      basePremiumRatePerLakh:550, minCoverageAmount:500000, maxCoverageAmount:50000000,  isFeatured:false },
]

function formatCoverage(amount) {
  if (!amount) return '₹50L+'
  const n = Number(amount)
  if (n >= 10_000_000) return `₹${n/10_000_000} Cr`
  if (n >= 100_000)    return `₹${n/100_000} L`
  return `₹${n.toLocaleString('en-IN')}`
}

export default function ProductsSection({ showAll = false }) {
  const [products, setProducts] = useState(FALLBACK)
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState(null)   // product for modal

  useEffect(() => {
    const fn = showAll ? productsApi.getAll : productsApi.getFeatured
    fn()
      .then(r => setProducts(r.data.data || FALLBACK))
      .catch(() => setProducts(FALLBACK))
      .finally(() => setLoading(false))
  }, [showAll])

  const displayed = showAll ? products : products.filter(p => p.isFeatured).slice(0, 6)

  return (
    <section className={styles.section}>
      <div className="container">
        {!showAll && (
          <div className={styles.header}>
            <span className="section-tag">Our Plans</span>
            <h2 className="section-heading">Plans built for every life stage</h2>
            <p className="section-sub">
              From pure term protection to market-linked ULIPs and guaranteed pension annuities — find the plan that fits your life exactly.
            </p>
            <div className="gold-divider" />
          </div>
        )}

        {loading ? (
          <div className={styles.skelGrid}>
            {[1,2,3,4,5,6].map(i => <div key={i} className={styles.skel} />)}
          </div>
        ) : (
          <div className={styles.grid}>
            {displayed.map((p, idx) => {
              const meta = TYPE_LABELS[p.productType] || TYPE_LABELS.TERM_LIFE
              const icon = TYPE_ICON[p.productType]   || '🛡️'
              return (
                <div key={p.id} className={`${styles.card} animate-fade-up`} style={{ animationDelay: `${idx * 70}ms` }}>
                  <div className={styles.cardTop}>
                    <span className={styles.typeIcon}>{icon}</span>
                    <span className={styles.typeBadge} style={{ color: meta.color, background: meta.bg }}>
                      {meta.label}
                    </span>
                  </div>

                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.desc}>{p.description}</p>

                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Starting from</span>
                      <span className={styles.metaVal}>
                        ₹{p.basePremiumRatePerLakh?.toLocaleString('en-IN') || '500'}/lakh
                      </span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Max coverage</span>
                      <span className={styles.metaVal}>{formatCoverage(p.maxCoverageAmount)}</span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button
                      className={`btn btn-primary ${styles.quoteBtn}`}
                      onClick={() => setSelected(p)}
                    >
                      Get Quote
                    </button>
                    <Link to="/calculator" className={`btn btn-ghost ${styles.calcBtn}`}>
                      Calculate →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!showAll && (
          <div className={styles.footer}>
            <Link to="/products" className="btn btn-outline">
              View all plans
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </Link>
          </div>
        )}
      </div>

      {selected && (
        <QuoteModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
