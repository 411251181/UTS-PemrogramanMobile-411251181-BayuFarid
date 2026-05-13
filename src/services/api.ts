// api.ts
// ============================================================================
// API SERVICE - Simulating API calls for demonstration
// ============================================================================
// This service simulates API responses since no real backend is provided
// In production, replace with actual API endpoints
// ============================================================================

import { create } from 'axios';
import { Task } from '../context/taskReducer';

// ============================================================================
// SECURITY CONCERNS & SOLUTIONS
// ============================================================================
// 
// CONCERN 1: Data in Transit (Man-in-the-Middle attacks)
// - Problem: HTTP traffic can be intercepted
// - Solution: Use HTTPS with TLS 1.3, implement Certificate Pinning
//
// CONCERN 2: Authentication Token Storage
// - Problem: Tokens stored in AsyncStorage are accessible
// - Solution: Use secure storage (Keychain/Keystore) with encryption
//
// CONCERN 3: Input Validation
// - Problem: SQL injection, XSS attacks on API inputs
// - Solution: Sanitize all inputs, use parameterized queries
//
// CONCERN 4: Rate Limiting & API Abuse
// - Problem: API exhaustion, brute force attacks
// - Solution: Implement rate limiting, use API keys, monitoring
//
// ============================================================================

const API_BASE_URL = 'https://api.taskmate.devnusa.example.com';
const MOCK_DELAY = 500; // Simulate network latency

// Create axios instance with default config
const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // SECURITY: In production, retrieve token from secure storage
    // const token = await SecureStorage.getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      console.log('Unauthorized: Token expired');
    } else if (error.response?.status === 403) {
      // Forbidden access
      console.log('Forbidden: Insufficient permissions');
    } else if (error.response?.status === 429) {
      // Rate limited
      console.log('Too many requests');
    }
    return Promise.reject(error);
  }
);

// Simulated API functions (replace with real API calls in production)

export const fetchTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, MOCK_DELAY);
  });
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      resolve(newTask);
    }, MOCK_DELAY);
  });
};

export const updateTask = async (task: Task): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(task);
    }, MOCK_DELAY);
  });
};

export const deleteTask = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, MOCK_DELAY);
  });
};

export default apiClient;