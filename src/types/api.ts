export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  plan: string;
  billing_cycle: string;
  status: string;
}

export interface UsageItem {
  used: number;
  limit: number;
  percentage: number;
}

export interface DashboardData {
  user: UserProfile;
  subscription: Subscription | null;
  usage: {
    kb_files: UsageItem;
    vocab_terms: number;
    notes: number;
  };
}

export interface CallStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

export interface CallParticipant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  ai_interactions: number;
  participants: CallParticipant[];
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface CallHistory {
  callSessions: CallSession[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
