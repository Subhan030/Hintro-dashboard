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
            <path d="M 14.5 9.5 L 21.5 9.5 A 7 7 0 0 0 14.5 2.5 Z" />
            <path d="M 12 12 L 22 12 A 10 10 0 1 1 12 2 Z" />
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
            <g transform="translate(-1.8, -1.8) scale(1.15)">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0 -2.576 2.576l-.813 2.846a.75.75 0 0 1 -1.442 0l-.813-2.846a3.75 3.75 0 0 0 -2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1 -1.456 0l-.258-1.036a2.625 2.625 0 0 0 -1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1 -1.422 0l-.395-1.183a1.5 1.5 0 0 0 -.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
            </g>
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
