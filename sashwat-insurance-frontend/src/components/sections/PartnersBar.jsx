import styles from './PartnersBar.module.css'

const PARTNERS = [
  { name: 'TATA AIA Life Insurance', type: 'Life' },
  { name: 'TATA AIG',               type: 'General' },
  { name: 'ICICI Lombard',          type: 'General' },
  { name: 'Star Health Insurance',  type: 'Health' },
  { name: 'Care Health Insurance',  type: 'Health' },
  { name: 'Go Digit',               type: 'General' },
  { name: 'Royal Sundaram',         type: 'General' },
  { name: 'Niva Bupa',              type: 'Health' },
]

const TYPE_COLOR = {
  Life:    { color: '#1a5c2e', bg: '#e6f4ec' },
  Health:  { color: '#9b1c3a', bg: '#fdeef1' },
  General: { color: '#1e3a7a', bg: '#eef1fa' },
}

export default function PartnersBar() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.label}>Our trusted insurance partners</p>
        <div className={styles.grid}>
          {PARTNERS.map(p => {
            const tc = TYPE_COLOR[p.type]
            return (
              <div key={p.name} className={styles.partner}>
                <span className={styles.partnerName}>{p.name}</span>
                <span className={styles.partnerType} style={{ color: tc.color, background: tc.bg }}>{p.type}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
