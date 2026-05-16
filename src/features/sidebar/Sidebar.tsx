import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import FeedbackPanel from './FeedbackPanel';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { userId, setUserId } = useUser();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const toggleUser = () => {
    setUserId(userId === 'u1' ? 'u2' : 'u1');
  };

  return (
    <>
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logo}>Hintro</div>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={onCloseMobile}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5 2v14h11V5H9z"/>
          </svg>
          Dashboard
        </NavLink>
        <div className={styles.navLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Call Insights
        </div>
        <div className={styles.navLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-4 14h8v-2H8v2zm0-4h4v-2H8v2z"/>
          </svg>
          Knowledge Base
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className={styles.navLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10zm-5-4H8V9h8v2z"/>
          </svg>
          Prompts
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className={styles.navLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
            <line x1="6.34" y1="6.34" x2="9.88" y2="9.88" />
            <line x1="17.66" y1="17.66" x2="14.12" y2="14.12" />
            <line x1="17.66" y1="6.34" x2="14.12" y2="9.88" />
            <line x1="6.34" y1="17.66" x2="9.88" y2="14.12" />
          </svg>
          Boxy Controls
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      </nav>

      <div className={styles.bottomSection}>
        <div className={styles.navLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h5l2 3h6l2-3h5v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>
            <path d="M2 12l3.45-6.89A2 2 0 0 1 7.24 4h9.52a2 2 0 0 1 1.79 1.11L22 12" fill="none"/>
            <path d="M12 2v10" fill="none"/>
            <path d="M8 8l4 4 4-4" fill="none"/>
          </svg>
          Feedback History
        </div>
        <div className={styles.navLink} onClick={() => setIsFeedbackOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="9" width="8" height="3" rx="1" />
            <rect x="13" y="9" width="8" height="3" rx="1" />
            <rect x="4" y="13" width="7" height="8" rx="1" />
            <rect x="13" y="13" width="7" height="8" rx="1" />
            <path d="M12 9a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 9a3 3 0 1 0 3-3 3 3 0 0 0-3 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Feedback
        </div>

        <button className={styles.upgradeBtn}>Upgrade</button>

        <button className={styles.devSwitcher} onClick={toggleUser}>
          [Switch to {userId === 'u1' ? 'u2' : 'u1'}]
        </button>
      </div>
    </aside>
    <FeedbackPanel isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};

export default Sidebar;
