// taskReducer.ts
// ============================================================================
// REDUCER PATTERN ANALYSIS: Context API + useReducer vs Redux
// ============================================================================
// Context API + useReducer chosen over Redux for this prototype because:
// 1. Simpler state management for small-to-medium app scale
// 2. Built-in React hooks, no additional dependencies needed
// 3. Less boilerplate code, faster development
// 4. Context API provides adequate separation for < 10 interconnected states
//
// WHEN TO CHOOSE REDUX instead:
// - App scales to 50+ screens with complex interdependencies
// - Team of 5+ developers needs strict state predictability
// - Requires middleware (saga, thunk) for complex async flows
// - Need devtools with time-travel debugging across complex state trees
// ============================================================================

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  createdAt: string;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'FETCH_TASKS'; payload: Task[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: null,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        error: null,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };
    case 'FETCH_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};