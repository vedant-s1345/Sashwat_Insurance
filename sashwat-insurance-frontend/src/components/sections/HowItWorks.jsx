import styles from './HowItWorks.module.css'

const STEPS = [
  { n: '01', icon: '💬', title: 'Tell us your need', desc: 'Share your age, budget and what you want to protect — family, health, vehicle or assets. Takes 2 minutes.' },
  { n: '02', icon: '🔍', title: 'We compare for you', desc: 'Our advisors compare plans from 8 top insurers — TATA AIA, Star Health, ICICI Lombard and more — to find the best fit.' },
  { n: '03', icon: '📋', title: 'Get your quote', desc: 'Receive a clear, transparent quote with no hidden charges. We explain every detail before you decide.' },
  { n: '04', icon: '✅', title: 'Get covered instantly', desc: 'Complete the application online or with our advisor. Policy issuance within hours for most plans.' },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">How It Works</span>
          <h2 className="section-heading">Simple. Transparent. Trusted.</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            From your first question to your final policy — we guide you every step of the way.
          </p>
          <div className="gold-divider center" />
        </div>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s.n} className={`${styles.step} animate-fade-up`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{s.icon}</span>
                <span className={styles.num}>{s.n}</span>
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
