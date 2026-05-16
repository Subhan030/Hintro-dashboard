import { useState, useEffect } from 'react';

export interface FeedbackEntry {
  rating: number;
  comment: string;
  submittedAt: string;
}

const STORAGE_KEY = 'hintro_feedback';

export const useFeedback = () => {
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFeedbackHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse feedback history', e);
      }
    }
  }, []);

  const submitFeedback = (rating: number, comment: string) => {
    const newEntry: FeedbackEntry = {
      rating,
      comment,
      submittedAt: new Date().toISOString(),
    };
    
    const newHistory = [...feedbackHistory, newEntry];
    setFeedbackHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  return {
    feedbackHistory,
    feedbackCount: feedbackHistory.length,
    submitFeedback,
  };
};
