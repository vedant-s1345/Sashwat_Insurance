import styles from './PartnersBar.module.css'

const PARTNERS = [
  'HDFC Life', 'Max Life', 'ICICI Prudential', 'SBI Life',
  'Tata AIA', 'Bajaj Allianz', 'Aditya Birla Sun Life', 'Kotak Life',
]

export default function PartnersBar() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.label}>Powered by India's most trusted insurers</p>
        <div className={styles.partners}>
          {PARTNERS.map(p => (
            <div key={p} className={styles.partner}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
