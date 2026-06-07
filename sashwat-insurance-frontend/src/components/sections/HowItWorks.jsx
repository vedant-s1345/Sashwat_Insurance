import styles from './HowItWorks.module.css'

const STEPS = [
  {
    n: '01',
    icon: '🎯',
    title: 'Tell us about yourself',
    desc: 'Enter your age, income, health status and the coverage amount you need. Takes under 60 seconds.',
  },
  {
    n: '02',
    icon: '🔍',
    title: 'Compare plans instantly',
    desc: 'Our engine calculates premiums from 6 curated plans using real actuarial factors — age, gender, health, term.',
  },
  {
    n: '03',
    icon: '📋',
    title: 'Request your quote',
    desc: 'Pick a plan, fill in your details, and we send you a full quote PDF. Zero spam, zero agents chasing you.',
  },
  {
    n: '04',
    icon: '✅',
    title: 'Get covered in minutes',
    desc: 'Complete the application digitally. Policy issuance is instant after underwriting approval.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">How It Works</span>
          <h2 className="section-heading">Four steps to full protection</h2>
          <div className="gold-divider center" />
        </div>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s.n} className={`${styles.step} animate-fade-up`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className={styles.connector} />
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
