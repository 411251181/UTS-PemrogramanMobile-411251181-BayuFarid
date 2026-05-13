// TaskContext.tsx
// ============================================================================
// CONTEXT API IMPLEMENTATION
// ============================================================================
// Context API chosen to avoid prop drilling across component tree
// - Eliminates passing props through intermediate components
// - Provides global state access for task data
// - Integrates with useReducer for predictable state updates
// ============================================================================

import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskReducer, initialTaskState, Task, TaskState, TaskAction } from './taskReducer';

interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEY = '@TaskMate:tasks';

// ============================================================================
// SAMPLE DATA: Simulating API response for testing
// ============================================================================
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Setup Project Structure',
    description: 'Initialize folder structure following separation of concerns pattern',
    status: 'completed',
    priority: 'high',
    assignee: 'Bayu Farid',
    dueDate: '2026-05-13',
    createdAt: '2026-05-13T08:00:00Z',
  },
  {
    id: '2',
    title: 'Implement Navigation',
    description: 'Setup Stack and Tab navigators with React Navigation',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Bayu Farid',
    dueDate: '2026-05-13',
    createdAt: '2026-05-13T09:00:00Z',
  },
  {
    id: '3',
    title: 'Implement State Management',
    description: 'Create Context API with useReducer for task management',
    status: 'pending',
    priority: 'medium',
    assignee: 'Bayu Farid',
    dueDate: '2026-05-14',
    createdAt: '2026-05-13T10:00:00Z',
  },
  {
    id: '4',
    title: 'Create Task CRUD Operations',
    description: 'Implement Create, Read, Update, Delete functionality',
    status: 'pending',
    priority: 'medium',
    assignee: 'Bayu Farid',
    dueDate: '2026-05-14',
    createdAt: '2026-05-13T11:00:00Z',
  },
  {
    id: '5',
    title: 'Write Reflection Document',
    description: 'Create REFLECTION.md with architectural analysis',
    status: 'pending',
    priority: 'low',
    assignee: 'Bayu Farid',
    dueDate: '2026-05-14',
    createdAt: '2026-05-13T12:00:00Z',
  },
];

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // ==========================================================================
  // ASYNC STORAGE OPERATIONS
  // ==========================================================================
  // SECURITY CONCERN: AsyncStorage stores data in plaintext
  // - NOT suitable for sensitive data (tokens, passwords, PII)
  // - Data accessible to anyone with device access
  // SOLUTION: Use secure storage (Keychain/Keystore) for sensitive data
  // ==========================================================================

  const loadTasks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        const tasks: Task[] = JSON.parse(stored);
        dispatch({ type: 'FETCH_TASKS', payload: tasks });
      } else {
        // Initialize with sample data if no stored data
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks));
        dispatch({ type: 'FETCH_TASKS', payload: sampleTasks });
      }
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load tasks' });
    }
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save tasks' });
    }
  };

  // ==========================================================================
  // CRUD OPERATIONS
  // ==========================================================================
  // These functions encapsulate business logic and dispatch appropriate actions
  // Following separation of concerns: Components only handle UI, these handle data
  // ==========================================================================

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const refreshTasks = async () => {
    await loadTasks();
  };

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to storage when state changes
  useEffect(() => {
    if (state.tasks.length > 0) {
      saveTasks(state.tasks);
    }
  }, [state.tasks]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        addTask,
        updateTask,
        deleteTask,
        refreshTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// ============================================================================
// CUSTOM HOOK: useTasks
// ============================================================================
// Encapsulates context access logic
// Provides clean API for components to access task state and actions
// ============================================================================

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};