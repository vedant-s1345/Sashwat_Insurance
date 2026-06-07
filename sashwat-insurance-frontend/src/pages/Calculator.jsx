import CalculatorSection from '../components/sections/CalculatorSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import styles from './Calculator.module.css'

export default function Calculator() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag">Premium Calculator</span>
          <h1 className={styles.heading}>Calculate your premium instantly</h1>
          <p className={styles.sub}>
            Real actuarial pricing: age, gender, health status, smoking habit and policy term all factor in. No gimmicks, no lowball estimates.
          </p>
        </div>
      </div>
      <CalculatorSection />
      <CtaBanner />
    </>
  )
}
