import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { fetchCallHistory } from '../../api/endpoints';
import type { CallHistory as CallHistoryType } from '../../types/api';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import { formatDuration, formatDate } from '../../utils/formatters';
import styles from './CallHistory.module.css';

const CallHistory: React.FC = () => {
  const { userId } = useUser();
  const [data, setData] = useState<CallHistoryType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    let isMounted = true;
    
    const load = async () => {
      setLoading(true);
      setError(null);
      try {

        const res = await fetchCallHistory(userId, page * limit);
        if (isMounted) setData(res);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to load call history');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => { isMounted = false; };
  }, [userId, page]);

  useEffect(() => {
    setPage(1);
  }, [userId]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && !data) {
    return (
      <div className={styles.centerContainer}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={styles.centerContainer}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  const sessions = data?.callSessions || [];
  const totalCount = data?.pagination.totalCount || 0;
  const hasNextPage = data?.pagination.hasNextPage || false;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Call History
          <span className={styles.badge}>{totalCount} total</span>
        </h1>
      </header>

      {sessions.length === 0 ? (
        <EmptyState 
          title="No call history"
          subtitle="You haven't recorded any sessions yet. Once you do, they will appear here."
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          }
        />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Description</th>
                <th>Participants</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session._id}>
                  <td className={styles.clientCell} data-label="Client">
                    <div className={styles.clientAvatar}>{session.client[0].toUpperCase()}</div>
                    <span className={styles.clientName}>{session.client}</span>
                  </td>
                  <td className={styles.descCell} data-label="Description">{session.description}</td>
                  <td data-label="Participants">
                    <div className={styles.participants}>
                      {session.participants.map((p, i) => (
                        <div key={i} className={styles.participantTag}>
                          {p.name} {p.isUser && <span className={styles.youBadge}>(You)</span>}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className={styles.durationCell} data-label="Duration">{formatDuration(session.total_duration_seconds)}</td>
                  <td className={styles.dateCell} data-label="Date">{formatDate(session.started_at)}</td>
                  <td data-label="Status">
                    <span className={`${styles.statusBadge} ${session.status === 'ended' ? styles.statusEnded : styles.statusActive}`}>
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {hasNextPage && (
            <div className={styles.loadMoreWrapper}>
              <button 
                className={styles.loadMoreBtn} 
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CallHistory;
