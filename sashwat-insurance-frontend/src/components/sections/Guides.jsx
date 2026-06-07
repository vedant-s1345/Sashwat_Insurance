import styles from './Guides.module.css'

const GUIDES = [
  {
    tag: 'Beginner',
    time: '5 min read',
    title: 'Term vs Whole Life: Which is right for you?',
    desc: `Understand the core difference between pure protection and lifelong coverage with a savings component — and which suits your goals.`,
  },
  {
    tag: 'Planning',
    time: '7 min read',
    title: 'How much life insurance do you really need?',
    desc: `The Human Life Value formula explained. Calculate coverage based on your income, debts, dependants, and long-term goals.`,
  },
  {
    tag: 'Tax',
    time: '4 min read',
    title: 'Section 80C & 10(10D): Maximising your tax benefits',
    desc: `Life insurance premiums qualify for deductions under 80C. Maturity proceeds are tax-free under 10(10D). Here's exactly how to claim them.`,
  },
  {
    tag: 'ULIPs',
    time: '6 min read',
    title: 'ULIP vs Mutual Fund: The honest comparison',
    desc: `Both offer market-linked returns — but ULIPs come with insurance cover. We break down charges, liquidity, and long-term performance.`,
  },
  {
    tag: 'Claims',
    time: '3 min read',
    title: 'How to file a life insurance claim: Step-by-step',
    desc: `A practical guide for nominees. Documents needed, timelines, and how to ensure your claim is processed without delays.`,
  },
  {
    tag: 'Retirement',
    time: '8 min read',
    title: 'Building a retirement corpus with pension plans',
    desc: `Annuity vs lump-sum payout. How to calculate the corpus needed to sustain your lifestyle. Start planning at 35, not 55.`,
  },
]

const TAG_COLORS = {
  Beginner:   { color: '#065f46', bg: '#d1fae5' },
  Planning:   { color: '#1e40af', bg: '#dbeafe' },
  Tax:        { color: '#7c2d12', bg: '#fef3c7' },
  ULIPs:      { color: '#4c1d95', bg: '#ede9fe' },
  Claims:     { color: '#991b1b', bg: '#fee2e2' },
  Retirement: { color: '#065f46', bg: '#d1fae5' },
}

export default function Guides() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">Knowledge Hub</span>
          <h2 className="section-heading">Insurance guides, simplified</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Everything you need to make informed decisions — no jargon, no sales pitch.
          </p>
          <div className="gold-divider center" />
        </div>

        <div className={styles.grid}>
          {GUIDES.map((g, i) => {
            const tc = TAG_COLORS[g.tag] || { color: '#333', bg: '#f5f5f5' }
            return (
              <article
                key={g.title}
                className={`${styles.card} animate-fade-up`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.tag} style={{ color: tc.color, background: tc.bg }}>{g.tag}</span>
                  <span className={styles.time}>{g.time}</span>
                </div>
                <h3 className={styles.title}>{g.title}</h3>
                <p className={styles.desc}>{g.desc}</p>
                <button className={styles.readMore}>Read guide →</button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
