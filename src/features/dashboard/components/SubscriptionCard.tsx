import React from 'react';
import type { Subscription } from '../../../types/api';

import styles from './SubscriptionCard.module.css';

interface SubscriptionCardProps {
  subscription: Subscription | null;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  if (!subscription) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>Subscription</h2>
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>No active subscription found.</p>
          <button className={styles.ctaButton}>View Plans</button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return styles.statusActive;
      case 'canceled':
      case 'past_due':
        return styles.statusDanger;
      default:
        return styles.statusWarning;
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Subscription</h2>
      
      <div className={styles.content}>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Plan</span>
          <span className={styles.value}>
            {subscription.plan}
          </span>
        </div>

        <div className={styles.detailGroup}>
          <span className={styles.label}>Billing Cycle</span>
          <span className={styles.value}>
            {subscription.billing_cycle}
          </span>
        </div>

        <div className={styles.detailGroup}>
          <span className={styles.label}>Status</span>
          <span className={`${styles.badge} ${getStatusColor(subscription.status)}`}>
            {subscription.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
