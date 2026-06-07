import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'

const QUICK_ACTIONS = [
  { icon: '🧮', title: 'Calculate Premium', sub: 'Get an instant quote for any plan', to: '/calculator' },
  { icon: '📋', title: 'Browse Plans',       sub: 'Compare all 6 insurance products', to: '/products' },
  { icon: '📞', title: 'Request Callback',   sub: 'Our team will call you in 2 hours', to: '/products' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.avatar}>{user?.fullName?.[0]?.toUpperCase() || 'U'}</div>
        <div className={styles.name}>{user?.fullName}</div>
        <div className={styles.email}>{user?.email}</div>
        <span className={`badge ${user?.role === 'ADMIN' ? 'badge-navy' : 'badge-gold'} ${styles.role}`}>
          {user?.role}
        </span>
        {user?.isEmailVerified === false && (
          <div className={styles.verifyNote}>⚠️ Email not verified</div>
        )}
        <button className={`btn btn-outline ${styles.logoutBtn}`} onClick={logout}>Sign Out</button>
      </div>

      <div className={styles.main}>
        <h1 className={styles.heading}>Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
        <p className={styles.sub}>Your Sashwat Insurance dashboard. Manage your profile and explore plans.</p>

        <div className={styles.cards}>
          {QUICK_ACTIONS.map(a => (
            <Link key={a.title} to={a.to} className={styles.actionCard}>
              <span className={styles.actionIcon}>{a.icon}</span>
              <div>
                <div className={styles.actionTitle}>{a.title}</div>
                <div className={styles.actionSub}>{a.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.profileCard}>
          <h2 className={styles.profileHead}>Account Details</h2>
          <div className={styles.profileGrid}>
            {[
              ['Full Name', user?.fullName],
              ['Email',     user?.email],
              ['Phone',     user?.phone || '—'],
              ['Role',      user?.role],
              ['Account ID', `#${user?.id}`],
            ].map(([k, v]) => (
              <div key={k} className={styles.profileRow}>
                <span className={styles.profileKey}>{k}</span>
                <span className={styles.profileVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
