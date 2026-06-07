import { useState } from 'react'
import styles from './FaqSection.module.css'

const FAQS = [
  {
    q: 'Is Sashwat Insurance IRDAI approved?',
    a: `Yes. Sashwat Insurance operates under IRDAI registration and all plans offered are fully compliant with Indian insurance regulations.`
  },
  {
    q: 'How is the premium calculated?',
    a: `Premiums use actuarial factors: base rate per lakh of coverage, adjusted for age (younger = cheaper), gender (females get 10% discount), health status (Excellent: -10%, Poor: +50%), smoking status (+25% for smokers), and policy term. GST at 18% is added on top.`
  },
  {
    q: 'Can I buy a policy fully online?',
    a: `Yes. The entire journey — quote, application, payment, and issuance — is digital. No physical visits, no agent calls, no paperwork unless requested.`
  },
  {
    q: 'What documents do I need to apply?',
    a: `Typically: PAN card, Aadhaar card, recent passport-size photo, income proof (Form 16 or ITR), and bank account details. Medical reports may be required for high coverage amounts.`
  },
  {
    q: 'How do I file a claim?',
    a: `Nominees can file a claim through our portal or by calling our 24/7 helpline. Required documents: death certificate, policy document, ID proof of nominee, and a filled claim form. We target settlement within 30 days.`
  },
  {
    q: 'Can I cancel my policy after purchase?',
    a: `Yes. There is a 15-day free look period from the date of receiving the policy document. Within this period, you can cancel for any reason and receive a full refund minus any medical examination costs.`
  },
  {
    q: 'Are maturity proceeds taxable?',
    a: `Under Section 10(10D) of the Income Tax Act, maturity proceeds from life insurance policies are fully tax-exempt, provided the premium does not exceed 10% of the sum assured (or 15% for policies issued before April 2012).`
  },
  {
    q: 'What happens if I miss a premium payment?',
    a: `Most policies have a 30-day grace period for annual/quarterly/half-yearly modes and a 15-day period for monthly mode. If you don't pay within the grace period, the policy lapses — but can be reinstated within 2 years with due premiums and interest.`
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className="section-tag">FAQs</span>
            <h2 className="section-heading">Frequently asked questions</h2>
            <div className="gold-divider" />
            <p className={styles.sub}>
              Can't find your answer?{' '}
              <a href="mailto:support@sashwatinsurance.com" className={styles.contactLink}>
                Email our support team
              </a>{' '}
              — we respond within 4 hours.
            </p>
          </div>

          <div className={styles.list}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{faq.q}</span>
                  <span className={`${styles.chevron} ${open === i ? styles.chevronOpen : ''}`}>
                    ▾
                  </span>
                </button>
                {open === i && (
                  <div className={styles.answer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
