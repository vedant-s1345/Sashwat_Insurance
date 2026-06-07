import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.shield}>
          <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 4 L76 20 L76 54 Q76 80 40 90 Q4 80 4 54 L4 20 Z" fill="rgba(201,168,76,.08)" stroke="#c9a84c" strokeWidth="3" strokeLinejoin="round"/>
            <text x="40" y="60" textAnchor="middle" fill="#c9a84c" fontSize="40" fontWeight="700" fontFamily="Georgia,serif">?</text>
          </svg>
        </div>
        <div className={styles.code}>404</div>
        <h1 className={styles.heading}>Page not found</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn-primary">← Back to Home</Link>
          <Link to="/products" className="btn btn-outline">Browse Plans</Link>
        </div>
      </div>
    </div>
  )
}
