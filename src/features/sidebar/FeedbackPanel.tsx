import React, { useState } from 'react';
import { useFeedback } from '../../hooks/useFeedback';
import styles from './FeedbackPanel.module.css';

interface FeedbackPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ isOpen, onClose }) => {
  const { submitFeedback } = useFeedback();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return; 

    submitFeedback(rating, comment);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setRating(0);
      setComment('');
      onClose();
    }, 1500);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Provide Feedback</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {showSuccess ? (
          <div className={styles.successMessage}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p>Thank you for your feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>How would you rate your experience? *</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`${styles.starBtn} ${rating >= star ? styles.starActive : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Any additional comments? (Optional)</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Tell us what you think..."
                rows={4}
                className={styles.textarea}
              />
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={rating === 0}
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPanel;
