import { useState, useEffect } from 'react'
import { calculatorApi, productsApi } from '../../api/client.js'
import styles from './CalculatorSection.module.css'

// Fallback static products (mirrors DataSeeder)
const FALLBACK_PRODUCTS = [
  { id:1, name:'Sashwat Term Shield',    productType:'TERM_LIFE',       minEntryAge:18, maxEntryAge:60, minCoverageAmount:2500000, maxCoverageAmount:100000000, minTerm:10, maxTerm:40 },
  { id:2, name:'Sashwat Whole Life Plan',productType:'WHOLE_LIFE',      minEntryAge:18, maxEntryAge:55, minCoverageAmount:500000,  maxCoverageAmount:50000000,  minTerm:15, maxTerm:40 },
  { id:3, name:'Sashwat ULIP Growth Fund',productType:'ULIP',           minEntryAge:18, maxEntryAge:55, minCoverageAmount:500000,  maxCoverageAmount:50000000,  minTerm:5,  maxTerm:20 },
  { id:4, name:'Sashwat Endowment Plus', productType:'ENDOWMENT',       minEntryAge:18, maxEntryAge:55, minCoverageAmount:500000,  maxCoverageAmount:20000000,  minTerm:10, maxTerm:30 },
  { id:5, name:'Sashwat Child Future',   productType:'CHILD_PLAN',      minEntryAge:18, maxEntryAge:50, minCoverageAmount:500000,  maxCoverageAmount:10000000,  minTerm:10, maxTerm:25 },
  { id:6, name:'Sashwat Pension Secure', productType:'PENSION_ANNUITY', minEntryAge:30, maxEntryAge:65, minCoverageAmount:500000,  maxCoverageAmount:50000000,  minTerm:5,  maxTerm:30 },
]

const HEALTH = ['EXCELLENT','GOOD','AVERAGE','POOR']
const GENDERS = ['MALE','FEMALE','OTHER']

function fmtINR(n) {
  if (!n) return '—'
  const num = Number(n)
  return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 2 })
}

export default function CalculatorSection() {
  const [products, setProducts]   = useState(FALLBACK_PRODUCTS)
  const [form, setForm]           = useState({
    productId:       1,
    age:             30,
    gender:          'MALE',
    policyTermYears: 20,
    coverageAmount:  5000000,
    healthStatus:    'GOOD',
    isSmoker:        false,
    email:           '',
  })
  const [result,   setResult]     = useState(null)
  const [loading,  setLoading]    = useState(false)
  const [error,    setError]      = useState('')
  const [tab,      setTab]        = useState('annual')

  useEffect(() => {
    productsApi.getAll()
      .then(r => setProducts(r.data.data || FALLBACK_PRODUCTS))
      .catch(() => {})
  }, [])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleCalc = async () => {
    setError(''); setLoading(true); setResult(null)
    try {
      const payload = {
        productId:       Number(form.productId),
        age:             Number(form.age),
        gender:          form.gender,
        policyTermYears: Number(form.policyTermYears),
        coverageAmount:  Number(form.coverageAmount),
        healthStatus:    form.healthStatus,
        isSmoker:        form.isSmoker,
        email:           form.email || undefined,
      }
      const res = await calculatorApi.calculate(payload)
      setResult(res.data.data)
    } catch (e) {
      setError(e.response?.data?.message || 'Calculation failed. Please check inputs and try again.')
    } finally {
      setLoading(false)
    }
  }

  const premiumMap = {
    annual:     { label: 'Annual Premium', val: result?.annualPremium,     vat: result?.annualPremiumWithGst },
    monthly:    { label: 'Monthly Premium', val: result?.monthlyPremium,   vat: result?.monthlyPremiumWithGst },
    quarterly:  { label: 'Quarterly Premium', val: result?.quarterlyPremium, vat: null },
    halfyearly: { label: 'Half-yearly Premium', val: result?.halfYearlyPremium, vat: null },
  }

  return (
    <section className={styles.section} id="calculator">
      <div className="container">
        <div className={styles.layout}>

          {/* ── Form Panel ── */}
          <div className={styles.formPanel}>
            <span className="section-tag">Premium Calculator</span>
            <h2 className="section-heading">Get an instant quote</h2>
            <p className="section-sub" style={{ marginBottom: 32 }}>
              Real premiums, calculated server-side using actuarial factors. No guesswork.
            </p>

            {/* Product */}
            <div className="field">
              <label>Select Plan</label>
              <select value={form.productId} onChange={e => set('productId', e.target.value)}>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            {/* Age + Gender */}
            <div className={styles.row2}>
              <div className="field">
                <label>Age</label>
                <input
                  type="number" min={18} max={65}
                  value={form.age}
                  onChange={e => set('age', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Gender</label>
                <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                  {GENDERS.map(g => <option key={g} value={g}>{g.charAt(0)+g.slice(1).toLowerCase()}</option>)}
                </select>
              </div>
            </div>

            {/* Coverage */}
            <div className="field">
              <label>Coverage Amount — {fmtINR(form.coverageAmount)}</label>
              <input
                type="range" min={500000} max={10000000} step={500000}
                value={form.coverageAmount}
                onChange={e => set('coverageAmount', e.target.value)}
                className={styles.slider}
              />
              <div className={styles.sliderLabels}>
                <span>₹5 Lakh</span><span>₹1 Crore</span>
              </div>
            </div>

            {/* Term */}
            <div className="field">
              <label>Policy Term — {form.policyTermYears} years</label>
              <input
                type="range" min={5} max={40} step={1}
                value={form.policyTermYears}
                onChange={e => set('policyTermYears', e.target.value)}
                className={styles.slider}
              />
              <div className={styles.sliderLabels}>
                <span>5 yrs</span><span>40 yrs</span>
              </div>
            </div>

            {/* Health + Smoker */}
            <div className={styles.row2}>
              <div className="field">
                <label>Health Status</label>
                <select value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)}>
                  {HEALTH.map(h => <option key={h} value={h}>{h.charAt(0)+h.slice(1).toLowerCase()}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Tobacco / Smoker?</label>
                <select value={form.isSmoker} onChange={e => set('isSmoker', e.target.value === 'true')}>
                  <option value="false">Non-Smoker</option>
                  <option value="true">Smoker (+25%)</option>
                </select>
              </div>
            </div>

            {/* Email (optional, triggers quote email) */}
            <div className="field">
              <label>Email (optional — receive quote by email)</label>
              <input
                type="email" placeholder="you@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              className={`btn btn-primary ${styles.calcBtn}`}
              onClick={handleCalc}
              disabled={loading}
            >
              {loading ? 'Calculating…' : 'Calculate Premium →'}
            </button>
          </div>

          {/* ── Result Panel ── */}
          <div className={styles.resultPanel}>
            {!result ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🧮</div>
                <p className={styles.emptyText}>Fill in your details and hit Calculate to see your personalised premium breakdown.</p>
                <div className={styles.features}>
                  {['Age-adjusted pricing', 'GST included', '30-day valid quote', 'No commitment'].map(f => (
                    <span key={f} className={styles.feat}>✓ {f}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.result}>
                <div className={styles.resultHeader}>
                  <div>
                    <div className={styles.refLabel}>Quote Reference</div>
                    <div className={styles.refVal}>{result.quoteReference}</div>
                  </div>
                  <span className="badge badge-green">Valid 30 days</span>
                </div>

                <div className={styles.planName}>{result.productName}</div>
                <div className={styles.coverRow}>
                  <span className={styles.coverLabel}>Coverage:</span>
                  <span className={styles.coverVal}>{result.coverageAmountFormatted}</span>
                </div>

                {/* Frequency tabs */}
                <div className={styles.tabs}>
                  {[['annual','Annual'],['monthly','Monthly'],['quarterly','Quarterly'],['halfyearly','Half-yearly']].map(([k,l]) => (
                    <button
                      key={k}
                      className={`${styles.tab} ${tab === k ? styles.tabActive : ''}`}
                      onClick={() => setTab(k)}
                    >{l}</button>
                  ))}
                </div>

                <div className={styles.premiumBlock}>
                  <div className={styles.premiumLabel}>{premiumMap[tab].label}</div>
                  <div className={styles.premiumVal}>{fmtINR(premiumMap[tab].val)}</div>
                  {premiumMap[tab].vat && (
                    <div className={styles.premiumGst}>With 18% GST: {fmtINR(premiumMap[tab].vat)}</div>
                  )}
                </div>

                <div className={styles.breakdown}>
                  <div className={styles.bRow}><span>Base Premium/yr</span><span>{fmtINR(result.annualPremium)}</span></div>
                  <div className={styles.bRow}><span>GST (18%)</span><span>{fmtINR(result.gstAmount)}</span></div>
                  <div className={`${styles.bRow} ${styles.bTotal}`}><span>Annual (incl. GST)</span><span>{fmtINR(result.annualPremiumWithGst)}</span></div>
                  <div className={styles.bRow}><span>Total for {result.policyTermYears} yrs</span><span>{fmtINR(result.totalPremiumPayable)}</span></div>
                </div>

                <p className={styles.disclaimer}>{result.disclaimer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
