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
            <mask id="dashboardMask">
              <rect width="24" height="24" fill="white" />
              <rect x="0" y="8" width="24" height="2" fill="black" />
              <rect x="14" y="10" width="2" height="14" fill="black" />
            </mask>
            <rect x="3" y="3" width="18" height="18" rx="3" mask="url(#dashboardMask)" />
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
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2L12 2L12 6A4 4 0 0 0 16 10L20 10L20 20A2 2 0 0 1 18 22L6 22A2 2 0 0 1 4 20L4 4A2 2 0 0 1 6 2ZM14 2A6 6 0 0 1 20 8L16 8A2 2 0 0 1 14 6L14 2ZM8 13L16 13A1 1 0 0 1 17 14A1 1 0 0 1 16 15L8 15A1 1 0 0 1 7 14A1 1 0 0 1 8 13ZM8 17L12 17A1 1 0 0 1 13 18A1 1 0 0 1 12 19L8 19A1 1 0 0 1 7 18A1 1 0 0 1 8 17Z"/>
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
            <path fillRule="evenodd" clipRule="evenodd" d="M 15 16 L 12.8 21.4 A 1 1 0 0 1 11.2 21.4 L 9 16 L 7 16 A 5 5 0 0 1 2 11 L 2 7 A 5 5 0 0 1 7 2 L 17 2 A 5 5 0 0 1 22 7 L 22 11 A 5 5 0 0 1 17 16 Z M 8 6 L 16 6 A 1 1 0 0 1 17 7 A 1 1 0 0 1 16 8 L 8 8 A 1 1 0 0 1 7 7 A 1 1 0 0 1 8 6 Z M 8 10 L 12 10 A 1 1 0 0 1 13 11 A 1 1 0 0 1 12 12 L 8 12 A 1 1 0 0 1 7 11 A 1 1 0 0 1 8 10 Z"/>
          </svg>
          Prompts
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className={styles.navLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" strokeWidth="2" />
            <circle cx="12" cy="12" r="7" strokeWidth="5" strokeDasharray="6.1086 4.8869" transform="rotate(20 12 12)" />
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
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="M 3 11.5 L 8 11.5 C 9 11.5 10.5 14 12 14 C 13.5 14 15 11.5 16 11.5 L 21 11.5 L 21 16 A 3 3 0 0 1 18 19 L 6 19 A 3 3 0 0 1 3 16 Z" />
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M 4 11.5 L 6 5.5 C 7 3.5 7.5 3 8.5 3 M 20 11.5 L 18 5.5 C 17 3.5 16.5 3 15.5 3 M 12 2 L 12 10.5 M 9 7.5 L 12 10.5 L 15 7.5" />
          </svg>
          Feedback History
        </div>
        <div className={styles.navLink} onClick={() => setIsFeedbackOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M 11 7 L 4.5 7 A 1.5 1.5 0 0 0 3 8.5 A 1.5 1.5 0 0 0 4.5 10 L 11 10 Z" />
            <path d="M 13 7 L 19.5 7 A 1.5 1.5 0 0 1 21 8.5 A 1.5 1.5 0 0 1 19.5 10 L 13 10 Z" />
            <path d="M 11 11 L 4 11 L 4 18.5 A 1.5 1.5 0 0 0 5.5 20 L 11 20 Z" />
            <path d="M 13 11 L 20 11 L 20 18.5 A 1.5 1.5 0 0 1 18.5 20 L 13 20 Z" />
            <path fillRule="evenodd" d="
              M 5 4.5 A 3.5 3.5 0 1 0 12 4.5 A 3.5 3.5 0 1 0 5 4.5 Z
              M 6.7 4.5 A 1.8 1.8 0 1 1 10.3 4.5 A 1.8 1.8 0 1 1 6.7 4.5 Z
              M 12 4.5 A 3.5 3.5 0 1 0 19 4.5 A 3.5 3.5 0 1 0 12 4.5 Z
              M 13.7 4.5 A 1.8 1.8 0 1 1 17.3 4.5 A 1.8 1.8 0 1 1 13.7 4.5 Z
            " />
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
