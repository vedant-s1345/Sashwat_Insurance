import CareersSection from '../components/sections/CareersSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import styles from './Careers.module.css'

export default function Careers() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ color: 'rgba(255,255,255,.8)', background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)' }}>
            Career Opportunities
          </span>
          <h1 className={styles.heading}>Join Shashwat Insurance Services</h1>
          <p className={styles.sub}>
            Build a rewarding career in Life, Health and General Insurance. Flexible hours, unlimited earnings, and full training support — we grow together.
          </p>
        </div>
      </div>
      <CareersSection />
      <CtaBanner />
    </>
  )
}
