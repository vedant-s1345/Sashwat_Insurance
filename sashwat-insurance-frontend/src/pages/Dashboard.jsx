import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'

const QUICK_ACTIONS = [
  { icon: '🧮', title: 'Calculate Premium',    sub: 'Get an instant quote for any plan',          to: '/calculator', color: '#eef1fa', border: '#d4ddf0' },
  { icon: '📋', title: 'Browse Insurance Plans', sub: 'Life, Health & General Insurance',          to: '/products',   color: '#fdeef1', border: '#f5c6d0' },
  { icon: '💼', title: 'Career Opportunities',  sub: 'Join our growing team',                      to: '/careers',    color: '#e6f4ec', border: '#bbddc8' },
  { icon: '📞', title: 'Request Consultation',  sub: 'Our advisors will call within 24 hours',     to: '/products',   color: '#fef9e7', border: '#f5e6a3' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className={styles.page}>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sideTop}>
          <Link to="/" className={styles.sideLogoRow}>
            <img src="/logo.png" alt="SIS" className={styles.sideLogo} />
            <span className={styles.sideLogoName}>SIS</span>
          </Link>

          <div className={styles.profile}>
            <div className={styles.avatar}>{user?.fullName?.[0]?.toUpperCase() || 'U'}</div>
            <div className={styles.profileName}>{user?.fullName}</div>
            <div className={styles.profileEmail}>{user?.email}</div>
            <span className={`badge ${user?.role === 'ADMIN' ? 'badge-navy' : 'badge-gold'} ${styles.roleBadge}`}>
              {user?.role}
            </span>
          </div>

          <nav className={styles.sideNav}>
            {[
              { icon: '🏠', label: 'Dashboard',       to: '/dashboard' },
              { icon: '📋', label: 'Insurance Plans',  to: '/products' },
              { icon: '🧮', label: 'Calculator',       to: '/calculator' },
              { icon: '💼', label: 'Careers',          to: '/careers' },
            ].map(item => (
              <Link key={item.to} to={item.to} className={styles.sideNavItem}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <button className={`btn btn-outline ${styles.logoutBtn}`} onClick={logout}>
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>

        {/* Welcome Header */}
        <div className={styles.welcomeBar}>
          <div>
            <h1 className={styles.heading}>
              Welcome back, {user?.fullName?.split(' ')[0]}! 👋
            </h1>
            <p className={styles.sub}>Here's your Shashwat Insurance Services portal.</p>
          </div>
          <img src="/logo.png" alt="SIS" className={styles.headerLogo} />
        </div>

        {/* Quick Actions */}
        <div className={styles.actionsGrid}>
          {QUICK_ACTIONS.map(a => (
            <Link
              key={a.title}
              to={a.to}
              className={styles.actionCard}
              style={{ background: a.color, borderColor: a.border }}
            >
              <span className={styles.actionIcon}>{a.icon}</span>
              <div>
                <div className={styles.actionTitle}>{a.title}</div>
                <div className={styles.actionSub}>{a.sub}</div>
              </div>
              <span className={styles.actionArrow}>→</span>
            </Link>
          ))}
        </div>

        {/* Account Details */}
        <div className={styles.detailsCard}>
          <h2 className={styles.detailsHead}>Account Details</h2>
          <div className={styles.detailsGrid}>
            {[
              ['Full Name',  user?.fullName],
              ['Email',      user?.email],
              ['Phone',      user?.phone || '—'],
              ['Role',       user?.role],
              ['Account ID', `#${user?.id}`],
            ].map(([k, v]) => (
              <div key={k} className={styles.detailRow}>
                <span className={styles.detailKey}>{k}</span>
                <span className={styles.detailVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners strip */}
        <div className={styles.partnersCard}>
          <div className={styles.partnersHead}>Our Insurance Partners</div>
          <div className={styles.partnersList}>
            {['TATA AIA Life Insurance', 'TATA AIG', 'ICICI Lombard', 'Star Health Insurance', 'Care Health Insurance', 'Go Digit', 'Royal Sundaram', 'Niva Bupa'].map(p => (
              <span key={p} className={styles.partnerChip}>{p}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
