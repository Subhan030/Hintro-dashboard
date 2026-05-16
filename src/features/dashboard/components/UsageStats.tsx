import React, { useEffect, useState } from 'react';
import type { DashboardData } from '../../../types/api';

import styles from './UsageStats.module.css';

interface UsageStatsProps {
  usage: DashboardData['usage'] | undefined;
}

const UsageStats: React.FC<UsageStatsProps> = ({ usage }) => {

  const [kbWidth, setKbWidth] = useState(0);

  const kbFiles = usage?.kb_files || { used: 0, limit: 100, percentage: 0 };
  const vocabTerms = usage?.vocab_terms || 0;
  const notes = usage?.notes || 0;

  useEffect(() => {

    const timer = setTimeout(() => {
      setKbWidth(kbFiles.percentage);
    }, 50);
    return () => clearTimeout(timer);
  }, [kbFiles.percentage]);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Usage</h2>
      
      <div className={styles.grid}>
        
        <div className={styles.tile}>
          <div className={styles.tileHeader}>
            <span className={styles.tileTitle}>KB Files</span>
            <span className={styles.tileCount}>{kbFiles.used} / {kbFiles.limit}</span>
          </div>
          <div className={styles.progressTrack}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${kbWidth}%` }}
              aria-valuenow={kbFiles.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            />
          </div>
        </div>

        <div className={styles.tile}>
          <div className={styles.tileHeader}>
            <span className={styles.tileTitle}>Vocab Terms</span>
          </div>
          <div className={styles.tileBigNumber}>{vocabTerms}</div>
        </div>

        <div className={styles.tile}>
          <div className={styles.tileHeader}>
            <span className={styles.tileTitle}>Notes</span>
          </div>
          <div className={styles.tileBigNumber}>{notes}</div>
        </div>
      </div>
    </div>
  );
};

export default UsageStats;
