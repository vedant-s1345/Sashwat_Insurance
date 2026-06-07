import styles from './TrustBar.module.css'

const CERTS = [
  { label: 'IRDAI Approved', icon: '🛡️' },
  { label: 'ISO 27001 Certified', icon: '🔒' },
  { label: '99.5% Claim Settlement', icon: '✅' },
  { label: 'Zero Spam Guarantee', icon: '🚫' },
  { label: '24/7 Support', icon: '📞' },
]

const PARTNERS = ['HDFC Life', 'Max Life', 'ICICI Prudential', 'SBI Life', 'Tata AIA', 'Bajaj Allianz', 'Aditya Birla']

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

        <div className={styles.divider} />

        <div className={styles.partnerRow}>
          <span className={styles.partnerLabel}>Insurance partners:</span>
          <div className={styles.partners}>
            {PARTNERS.map(p => (
              <span key={p} className={styles.partner}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
