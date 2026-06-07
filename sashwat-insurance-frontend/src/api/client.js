import axios from 'axios'

const api = axios.create({
  baseURL: '/api',          // Vite proxy → http://localhost:8081/api
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// ── Attach JWT automatically ──────────────────────
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('sashwat_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
}, err => Promise.reject(err))

// ── Auto-logout on 401 ────────────────────────────
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sashwat_token')
      localStorage.removeItem('sashwat_user')
      window.dispatchEvent(new Event('sashwat:logout'))
    }
    return Promise.reject(err)
  }
)

// ── Auth endpoints → POST /auth/register, POST /auth/login ──
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  me:       ()     => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  changePassword: (data)  => api.post('/auth/change-password', data),
}

// ── Leads → POST /leads ───────────────────────────
// Payload: fullName, email, phone, leadType (QUOTE_REQUEST|CONTACT_FORM|CALLBACK_REQUEST)
// Optional: productId, age, gender, policyTermYears, coverageAmountRequested, healthStatus, message
export const leadsApi = {
  create: (data) => api.post('/leads', data),
}

// ── Products → GET /products ─────────────────────
export const productsApi = {
  getAll:     ()    => api.get('/products'),
  getFeatured:()    => api.get('/products/featured'),
  getByType:  (type)=> api.get(`/products/type/${type}`),
  getBySlug:  (slug)=> api.get(`/products/slug/${slug}`),
  getById:    (id)  => api.get(`/products/${id}`),
}

// ── Premium Calculator → POST /calculator/calculate ─
// Payload: { productId, age, gender, policyTermYears, coverageAmount,
//            healthStatus, isSmoker, email?, sessionId? }
// Response: { quoteReference, productName, annualPremium, monthlyPremium,
//             annualPremiumWithGst, monthlyPremiumWithGst, coverageAmountFormatted,
//             disclaimer, validUntil, ... }
export const calculatorApi = {
  calculate:  (data) => api.post('/calculator/calculate', data),
  getQuote:   (ref)  => api.get(`/calculator/quote/${ref}`),
}

export default api
