import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { fetchProfile } from '../../api/endpoints';
import Sidebar from '../../features/sidebar/Sidebar';
import styles from './AppShell.module.css';

const AppShell: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const { data: profile } = useApi(fetchProfile);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);

  };

  return (
    <div className={styles.container}>
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`${styles.sidebarWrapper} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
      </div>

      <div className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.mobileMenuButton} onClick={() => setIsMobileMenuOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1 className={styles.pageTitle}>Dashboard</h1>
          </div>
          
          <div className={styles.headerRight}>
            <button className={styles.tutorialButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
                <polygon points="7 4 19 12 7 20"></polygon>
              </svg>
              Watch Tutorial
            </button>
            
            <div className={styles.profileWrapper} ref={profileRef}>
              <div 
                className={styles.userProfile} 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className={styles.avatar}>
                  <img src={`https://ui-avatars.com/api/?name=${profile?.firstName || 'User'}&background=random`} alt="Avatar" />
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <button className={styles.logoutMenuItem} onClick={handleLogoutClick}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className={styles.mainScrollable}>
          <div key={location.pathname} className={styles.pageTransition}>
            <Outlet />
          </div>
        </main>
      </div>

      {isLogoutModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.logoutModal}>
            <h2 className={styles.modalTitle}>Leaving already?</h2>
            <div className={styles.modalDivider}></div>
            <p className={styles.modalDesc}>
              You can log back in anytime to continue your meetings with Hintro.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setIsLogoutModalOpen(false)}>
                Cancel
              </button>
              <button className={styles.modalConfirm} onClick={handleConfirmLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShell;
