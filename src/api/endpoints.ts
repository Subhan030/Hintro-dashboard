import { fetchClient } from './client';
import type { UserProfile, DashboardData, CallStats, CallHistory } from '../types/api';

export const fetchProfile = (userId: string) => 
  fetchClient<UserProfile>('/api/auth/profile', userId);

export const fetchDashboard = (userId: string) => 
  fetchClient<DashboardData>('/api/auth/dashboard', userId);

export const fetchCallStats = (userId: string) => 
  fetchClient<CallStats>('/api/call-sessions/stats', userId);

export const fetchCallHistory = (userId: string, limit?: number) => 
  fetchClient<CallHistory>(`/api/call-sessions${limit ? `?limit=${limit}` : ''}`, userId);
