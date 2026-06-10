import CalculatorSection from '../components/sections/CalculatorSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import styles from './Calculator.module.css'

export default function Calculator() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ color: 'rgba(255,255,255,.8)', background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)' }}>
            Premium Calculator
          </span>
          <h1 className={styles.heading}>Calculate your premium instantly</h1>
          <p className={styles.sub}>
            Get an accurate premium estimate using real actuarial factors — age, gender, health, smoking status and policy term. No guesswork, no hidden charges.
          </p>
        </div>
      </div>
      <CalculatorSection />
      <CtaBanner />
    </>
  )
}
