import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]}`} role="status">
      <span className="sr-only" style={{ display: 'none' }}>Loading...</span>
    </div>
  );
};

export default Spinner;
