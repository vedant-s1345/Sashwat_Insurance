import ProductsSection from '../components/sections/ProductsSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import styles from './Products.module.css'

export default function Products() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ color: 'rgba(255,255,255,.8)', background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)' }}>
            Our Services
          </span>
          <h1 className={styles.heading}>Life, Health & General Insurance</h1>
          <p className={styles.sub}>
            Partnered with 8 of India's top insurers — TATA AIA, ICICI Lombard, Star Health, Go Digit and more. Expert advice, zero pressure, best prices.
          </p>
          <div className={styles.partnerStrip}>
            {['TATA AIA', 'TATA AIG', 'ICICI Lombard', 'Star Health', 'Care Health', 'Go Digit', 'Royal Sundaram', 'Niva Bupa'].map(p => (
              <span key={p} className={styles.partnerChip}>{p}</span>
            ))}
          </div>
        </div>
      </div>
      <ProductsSection showAll />
      <CtaBanner />
    </>
  )
}
