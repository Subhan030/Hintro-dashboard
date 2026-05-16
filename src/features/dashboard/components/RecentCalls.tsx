import React from 'react';
import type { CallSession } from '../../../types/api';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styles from './RecentCalls.module.css';

dayjs.extend(advancedFormat);

interface RecentCallsProps {
  sessions: CallSession[] | undefined;
}

const RecentCalls: React.FC<RecentCallsProps> = ({ sessions }) => {

  if (!sessions || sessions.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Recent calls</h2>
        <div className={styles.emptyContainer}>
          <div className={styles.emptyIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>No Recent Calls</h3>
          <p className={styles.emptySubtitle}>
            Connect your Google Calendar to see upcoming meetings,<br/>
            get reminders, and join calls directly from Hintro.
          </p>
          <button className={styles.startCallBtn}>Start a Call</button>
        </div>
      </div>
    );
  }

  const grouped = sessions.reduce((acc, session) => {
    const dateStr = dayjs(session.started_at).format('MMMM Do');
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(session);
    return acc;
  }, {} as Record<string, CallSession[]>);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Recent calls</h2>
      
      <div className={styles.list}>
        {Object.entries(grouped).map(([date, calls]) => (
          <div key={date} className={styles.dateGroup}>
            <div className={styles.dateHeader}>{date}</div>
            {calls.map(session => (
              <div key={session._id} className={styles.row}>
                <div className={styles.clientAvatar}>
                  {session.client[0].toUpperCase()}
                </div>
                <div className={styles.rowMain}>
                  <div className={styles.callTitle}>{session.client} Call</div>
                  <div className={styles.avatarsRow}>
                    
                    <img src="https://ui-avatars.com/api/?name=A&background=random" alt="A" className={styles.participantAvatar}/>
                    <img src="https://ui-avatars.com/api/?name=B&background=random" alt="B" className={styles.participantAvatar}/>
                    <img src="https://ui-avatars.com/api/?name=C&background=random" alt="C" className={styles.participantAvatar}/>
                  </div>
                </div>
                <div className={styles.time}>{dayjs(session.started_at).format('h:mm a')}</div>
                <button className={styles.menuBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="12" cy="19" r="2"></circle>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCalls;
