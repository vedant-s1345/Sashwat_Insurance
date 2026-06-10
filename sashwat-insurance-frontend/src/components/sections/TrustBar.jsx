import styles from './TrustBar.module.css'

const CERTS = [
  { label: 'IRDAI Approved Partners', icon: '🛡️' },
  { label: 'Life Insurance',          icon: '❤️' },
  { label: 'Health Insurance',        icon: '🏥' },
  { label: 'General Insurance',       icon: '🚗' },
  { label: 'Expert Guidance',         icon: '🤝' },
]

export default function TrustBar() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.certs}>
          {CERTS.map(c => (
            <div key={c.label} className={styles.cert}>
              <span className={styles.icon}>{c.icon}</span>
              <span className={styles.label}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
