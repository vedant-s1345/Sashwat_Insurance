import ProductsSection from '../components/sections/ProductsSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import styles from './Products.module.css'

export default function Products() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag">Our Plans</span>
          <h1 className={styles.heading}>All Insurance Plans</h1>
          <p className={styles.sub}>
            Six carefully curated life insurance plans covering every life stage — from pure term protection to guaranteed pension annuities.
          </p>
        </div>
      </div>
      <ProductsSection showAll />
      <CtaBanner />
    </>
  )
}
