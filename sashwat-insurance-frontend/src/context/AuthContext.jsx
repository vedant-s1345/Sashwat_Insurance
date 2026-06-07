import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('sashwat_user')) } catch { return null }
  })
  const [token, setToken]     = useState(() => localStorage.getItem('sashwat_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // Persist helpers
  const saveSession = (accessToken, userInfo) => {
    localStorage.setItem('sashwat_token', accessToken)
    localStorage.setItem('sashwat_user',  JSON.stringify(userInfo))
    setToken(accessToken)
    setUser(userInfo)
  }

  const clearSession = useCallback(() => {
    localStorage.removeItem('sashwat_token')
    localStorage.removeItem('sashwat_user')
    setToken(null)
    setUser(null)
  }, [])

  // Listen for auto-logout (401 interceptor fires this event)
  useEffect(() => {
    window.addEventListener('sashwat:logout', clearSession)
    return () => window.removeEventListener('sashwat:logout', clearSession)
  }, [clearSession])

  // ── Login ──────────────────────────────────────
  const login = async ({ email, password }) => {
    setLoading(true); setError(null)
    try {
      // POST /api/auth/login → { success, data: { accessToken, user: { id, fullName, email, phone, role } } }
      const res  = await authApi.login({ email, password })
      const data = res.data.data          // unwrap ApiResponse wrapper
      saveSession(data.accessToken, data.user)
      return { ok: true, user: data.user }
    } catch (e) {
      const msg = e.response?.data?.message || 'Login failed. Please try again.'
      setError(msg)
      return { ok: false, message: msg }
    } finally {
      setLoading(false)
    }
  }

  // ── Register ───────────────────────────────────
  const register = async ({ fullName, email, phone, password }) => {
    setLoading(true); setError(null)
    try {
      const res  = await authApi.register({ fullName, email, phone, password })
      const data = res.data.data
      saveSession(data.accessToken, data.user)
      return { ok: true, user: data.user }
    } catch (e) {
      const msg = e.response?.data?.message || 'Registration failed.'
      setError(msg)
      return { ok: false, message: msg }
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ─────────────────────────────────────
  const logout = () => clearSession()

  const isAuthenticated = Boolean(token && user)
  const isAdmin         = user?.role === 'ADMIN'

  return (
    <AuthContext.Provider value={{ user, token, loading, error, isAuthenticated, isAdmin, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
