import React from 'react';
import { useApi } from '../../hooks/useApi';
import { fetchDashboard, fetchCallStats, fetchCallHistory } from '../../api/endpoints';
import Spinner from '../../components/Spinner';

import DashboardHeader from './components/DashboardHeader';
import CallStatsRow from './components/CallStatsRow';
import RecentCalls from './components/RecentCalls';

import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError, refetch: refetchDashboard } = useApi(fetchDashboard);
  const { data: callStats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApi(fetchCallStats);
  
  const fetchRecentCalls = React.useCallback((id: string) => fetchCallHistory(id, 3), []);
  const { data: recentCalls, loading: callsLoading, error: callsError, refetch: refetchCalls } = useApi(fetchRecentCalls);

  const isLoading = dashboardLoading || statsLoading || callsLoading;
  const error = dashboardError || statsError || callsError;

  const handleRetry = () => {
    refetchDashboard();
    refetchStats();
    refetchCalls();
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="lg" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <button onClick={handleRetry} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <DashboardHeader user={dashboardData?.user || null} />
      <CallStatsRow stats={callStats} />
      <RecentCalls sessions={recentCalls?.callSessions} />
    </div>
  );
};

export default Dashboard;
