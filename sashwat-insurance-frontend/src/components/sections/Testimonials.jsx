import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    avatar: 'PS',
    plan: 'Term Shield',
    rating: 5,
    text: `Got a ₹1 Crore term policy in 12 minutes. No agent calls, no paperwork. The premium calculator showed exactly what I'd pay — no surprises at checkout.`,
  },
  {
    name: 'Rajesh Gupta',
    city: 'Bengaluru',
    avatar: 'RG',
    plan: 'ULIP Growth Fund',
    rating: 5,
    text: `Switched from my old ULIP after using Sashwat's comparison tool. Clear fund options, transparent charges. The support team resolved my query in under an hour.`,
  },
  {
    name: 'Ananya Krishnan',
    city: 'Chennai',
    avatar: 'AK',
    plan: 'Child Future Plan',
    rating: 5,
    text: `Bought the child plan for my daughter's education. The milestone payout structure is exactly what we needed. Platform is clean and trust-inspiring.`,
  },
  {
    name: 'Vikram Singh',
    city: 'Delhi',
    avatar: 'VS',
    plan: 'Pension Secure',
    rating: 5,
    text: `Planning retirement at 55. Sashwat's pension calculator helped me understand exactly how much I'd receive monthly. Joined in 10 minutes flat.`,
  },
  {
    name: 'Meera Nair',
    city: 'Kochi',
    avatar: 'MN',
    plan: 'Endowment Plus',
    rating: 5,
    text: `The endowment plan perfectly combines savings with protection. Best part? The quote PDF arrived in my email within seconds. Very professional.`,
  },
  {
    name: 'Suresh Patel',
    city: 'Ahmedabad',
    avatar: 'SP',
    plan: 'Whole Life Plan',
    rating: 5,
    text: `Whole life coverage for my family's long-term security. Sashwat's interface made a complex product easy to understand. Highly recommend.`,
  },
]

function Stars({ count }) {
  return (
    <span className={styles.stars}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">Customer Stories</span>
          <h2 className="section-heading">Trusted by families across India</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Don't take our word for it — hear from the families we protect every day.
          </p>
          <div className="gold-divider center" />
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`${styles.card} animate-fade-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Stars count={t.rating} />
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.meta}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.sub}>{t.city} · {t.plan}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.aggregate}>
          <div className={styles.aggItem}>
            <span className={styles.aggVal}>4.8</span>
            <span className={styles.aggStars}>★★★★★</span>
            <span className={styles.aggLabel}>Average rating</span>
          </div>
          <div className={styles.aggDivider} />
          <div className={styles.aggItem}>
            <span className={styles.aggVal}>12,000+</span>
            <span className={styles.aggLabel}>Verified reviews</span>
          </div>
          <div className={styles.aggDivider} />
          <div className={styles.aggItem}>
            <span className={styles.aggVal}>99.5%</span>
            <span className={styles.aggLabel}>Claim settlement rate</span>
          </div>
        </div>
      </div>
    </section>
  )
}
