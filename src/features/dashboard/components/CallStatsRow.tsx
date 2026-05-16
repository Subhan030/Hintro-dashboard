import React from 'react';
import type { CallStats } from '../../../types/api';
import { formatDuration, formatRelativeDate } from '../../../utils/formatters';
import styles from './CallStatsRow.module.css';

interface CallStatsRowProps {
  stats: CallStats | null;
}

const CallStatsRow: React.FC<CallStatsRowProps> = ({ stats }) => {
  const totalSessions = stats?.totalSessions || 0;
  const averageDuration = stats?.averageDuration || 0;
  const totalAIInteractions = stats?.totalAIInteractions || 0;
  const lastSessionDate = stats?.lastSession?.[0] ? formatRelativeDate(stats.lastSession[0]) : '-';

  return (
    <div className={styles.grid}>
      
      <div className={styles.card}>
        <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-icon-red-bg)', color: 'var(--color-icon-red)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M 13 11 h 8.95 A 10 10 0 0 0 13 2.05 V 11 Z" />
            <path d="M 11 13 h 10.95 A 10 10 0 1 1 11 2.05 V 13 Z" />
          </svg>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>Total Sessions</div>
          <div className={styles.cardValue}>{totalSessions}</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-icon-blue-bg)', color: 'var(--color-icon-blue)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="7" x2="12" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="12" x2="15.5" y2="15.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>Average Duration</div>
          <div className={styles.cardValue}>{averageDuration === 0 ? '0' : formatDuration(averageDuration).replace('m', 'm ').replace('s', 'sec')}</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-icon-green-bg)', color: 'var(--color-icon-green)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 8l-1-2.5L15.5 4.5 18 3.5 19 1l1 2.5L22.5 4.5 20 5.5 19 8zm-8 14l-2.5-5.5L3 14l5.5-2.5L11 6l2.5 5.5L19 14l-5.5 2.5L11 22z"/>
          </svg>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>AI Used</div>
          <div className={styles.cardValue}>{totalAIInteractions} {totalAIInteractions > 0 && 'times'}</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-icon-purple-bg)', color: 'var(--color-icon-purple)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="7" y="2" width="2" height="4" rx="1" />
            <rect x="15" y="2" width="2" height="4" rx="1" />
            <path d="M19 4H5C3.34 4 2 5.34 2 7v13c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3zm1 16c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-9h16v9z" />
            <circle cx="12" cy="14" r="1" />
            <circle cx="14.5" cy="14" r="1" />
            <circle cx="17" cy="14" r="1" />
            <circle cx="7" cy="16.5" r="1" />
            <circle cx="9.5" cy="16.5" r="1" />
            <circle cx="12" cy="16.5" r="1" />
            <circle cx="14.5" cy="16.5" r="1" />
            <circle cx="17" cy="16.5" r="1" />
            <circle cx="7" cy="19" r="1" />
            <circle cx="9.5" cy="19" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="14.5" cy="19" r="1" />
          </svg>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>Last Session</div>
          <div className={styles.cardValue}>{lastSessionDate}</div>
        </div>
      </div>
    </div>
  );
};

export default CallStatsRow;
