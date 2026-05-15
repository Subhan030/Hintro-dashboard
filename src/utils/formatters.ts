import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatDate = (iso: string): string => {
  return dayjs(iso).format('MMM D, YYYY');
};

export const formatRelativeDate = (iso: string): string => {
  return dayjs(iso).fromNow();
};

export const formatPercentage = (n: number): string => {
  return `${n}%`;
};
