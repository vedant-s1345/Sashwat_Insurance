import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <img src="/logo.png" alt="SIS" className={styles.logo} />
        <div className={styles.code}>404</div>
        <h1 className={styles.heading}>Page not found</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn-primary">← Back to Home</Link>
          <Link to="/products" className="btn btn-outline">Browse Plans</Link>
          <Link to="/careers" className="btn btn-outline">Join Our Team</Link>
        </div>
      </div>
    </div>
  )
}
