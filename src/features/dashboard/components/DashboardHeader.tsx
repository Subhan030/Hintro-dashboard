import React from 'react';
import type { UserProfile } from '../../../types/api';
import styles from './DashboardHeader.module.css';

interface DashboardHeaderProps {
  user: UserProfile | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const firstName = user?.firstName || 'Name';

  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.greeting}>
          Hi, {firstName} 👋 Welcome to Hintro
        </h1>
        <p className={styles.subtitle}>
          Ready to make your next call smarter ?
        </p>
      </div>
      <button className={styles.ctaButton}>
        <span className={styles.desktopText}>Start New Call</span>
        <span className={styles.mobileText}>Start Call</span>
      </button>
    </div>
  );
};

export default DashboardHeader;
