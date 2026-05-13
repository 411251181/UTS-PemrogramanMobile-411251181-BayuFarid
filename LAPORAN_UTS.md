# LAPORAN UJIAN TENGAH SEMESTER
## PEMROGRAMAN MOBILE (412563402)

---

**Nama:** Bayu Farid  
**NIM:** 411251181  
**Mata Kuliah:** Pemrograman Mobile (3 SKS)  
**Dosen:** Wawan Kurniawan, S.Kom, M.Kom  
**Tanggal:** Rabu, 13 Mei 2026  
**Aplikasi:** TaskMate - Internal Task Manager DevNusa

---

## BAGIAN 1: DESAIN ARSITEKTUR & NAVIGASI (50%)

### 1.1 Struktur Folder Project

Aplikasi TaskMate dibangun menggunakan **Expo React Native** dengan **TypeScript** dan menerapkan prinsip **separation of concerns**. Struktur folder dirancang untuk memisahkan tanggung jawab setiap komponen:

```
TaskMate/
├── app/                          # Expo Router - File-based routing
│   ├── _layout.tsx              # Root Stack Navigator
│   ├── login.tsx                # Login Screen
│   ├── (tabs)/                  # Tab Navigator group
│   │   ├── _layout.tsx          # Bottom Tab configuration
│   │   ├── index.tsx            # Task List Screen (Home)
│   │   └── explore.tsx          # Dashboard Screen
│   └── task/
│       └── [id].tsx             # Task Detail Screen (Dynamic route)
├── src/
│   ├── components/              # Reusable UI components
│   │   └── TaskCard.tsx         # Task card component
│   ├── constants/               # App-wide constants
│   │   └── theme.ts             # Colors, spacing, typography
│   ├── context/                 # State management
│   │   ├── TaskContext.tsx      # Context Provider + CRUD logic
│   │   └── taskReducer.ts       # Reducer, actions, types
│   ├── hooks/                   # Custom React hooks
│   │   └── useTasks.ts          # Task management hook
│   └── services/                # External services
│       └── api.ts               # API client (Axios)
├── REFLECTION.md                # Analisis kritis arsitektur
├── README.md                    # Dokumentasi project
└── package.json                 # Dependencies
```

**Link ke Struktur File (GitHub):**
| File | Lokasi |
|------|--------|
| Root Layout | [app/_layout.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/_layout.tsx) |
| Login Screen | [app/login.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/login.tsx) |
| Tab Layout | [app/(tabs)/_layout.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/_layout.tsx) |
| Task List | [app/(tabs)/index.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/index.tsx) |
| Dashboard | [app/(tabs)/explore.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/explore.tsx) |
| Task Detail | [app/task/[id].tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/task/[id].tsx) |
| TaskContext | [src/context/TaskContext.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/context/TaskContext.tsx) |
| TaskReducer | [src/context/taskReducer.ts](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/context/taskReducer.ts) |
| Custom Hook | [src/hooks/useTasks.ts](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/hooks/useTasks.ts) |
| TaskCard | [src/components/TaskCard.tsx](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/components/TaskCard.tsx) |
| Theme | [src/constants/theme.ts](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/constants/theme.ts) |
| API Service | [src/services/api.ts](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/services/api.ts) |

**Alasan Pemilihan Struktur:**
- **app/**: Menggunakan Expo Router untuk file-based routing yang lebih intuitif
- **src/components**: Komponen reusable untuk menghindari duplikasi kode
- **src/context**: Centralized state management dengan Context API
- **src/hooks**: Custom hooks untuk encapsulation logic
- **src/services**: Abstraksi layer untuk API calls
- **src/constants**: Single source of truth untuk design tokens

### 1.2 Implementasi Navigasi

Aplikasi menggunakan kombinasi **Stack Navigator** dan **Tab Navigator** dari React Navigation v7:

#### Stack Navigator (Root Level)
File: [`app/_layout.tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/_layout.tsx)

```typescript
<Stack initialRouteName="login">
  <Stack.Screen name="login" options={{ headerShown: false }} />
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="task/[id]" options={{ title: 'Task Detail' }} />
</Stack>
```

**Alasan Pemilihan Stack Navigator:**
- Mengelola flow linear: Login → Tabs → Detail
- Memungkinkan navigasi back dengan gesture
- Cocok untuk hierarchical navigation
- Mendukung parameter passing antar screen

#### Tab Navigator (Main App)
File: [`app/(tabs)/_layout.tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/_layout.tsx)

```typescript
<Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
  <Tabs.Screen name="index" options={{ title: 'Tasks' }} />
  <Tabs.Screen name="explore" options={{ title: 'Dashboard' }} />
</Tabs>
```

**Alasan Pemilihan Tab Navigator:**
- Akses cepat ke 2 fitur utama (Tasks & Dashboard)
- Persistent navigation state
- Familiar UX pattern untuk mobile apps
- Cocok untuk peer-level screens

### 1.3 Screen Implementation

#### Login Screen ([`app/login.tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/login.tsx))
- Form validation (email format, password min 6 char)
- Navigate to tabs setelah login sukses
- Demo credentials: bayu@devnusa.id / taskmate123

#### Task List Screen ([`app/(tabs)/index.tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/index.tsx))
- FlatList untuk render task cards
- Quick add task form
- Summary statistics (completed/total)
- Navigate ke detail saat card di-tap

#### Task Detail Screen ([`app/task/[id].tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/task/[id].tsx))
- Dynamic route dengan parameter `id`
- Full CRUD: Read, Update, Delete
- Form fields: title, description, assignee, due date, status, priority
- Navigate back setelah delete

#### Dashboard Screen ([`app/(tabs)/explore.tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/explore.tsx))
- Statistik task: pending, in progress, completed, high priority
- Real-time update dari Context

### 1.4 Justifikasi Desain Navigasi

**Trade-off Stack vs Tab:**
- Stack: Baik untuk flow linear, tapi tidak cocok untuk peer screens
- Tab: Baik untuk akses cepat, tapi tidak cocok untuk deep navigation

**Solusi Hybrid:**
Kombinasi Stack + Tab memberikan best of both worlds:
- Stack untuk auth flow dan detail screens
- Tab untuk main app navigation
- Hasil: UX yang intuitif dan scalable

---

## BAGIAN 2: STATE MANAGEMENT (30%)

### 2.1 Context API Implementation

File: [`src/context/TaskContext.tsx`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/context/TaskContext.tsx)

```typescript
const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  // ... CRUD operations
  return (
    <TaskContext.Provider value={{ state, dispatch, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
```

**Keuntungan Context API:**
- Menghindari prop drilling
- Global state accessible dari semua components
- Lightweight, tidak perlu library eksternal
- Cocok untuk aplikasi skala kecil-menengah

### 2.2 useReducer Implementation

File: [`src/context/taskReducer.ts`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/context/taskReducer.ts)

```typescript
export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => 
        t.id === action.payload.id ? action.payload : t
      )};
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'FETCH_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
```

**Keuntungan useReducer:**
- Predictable state updates
- Centralized business logic
- Easy to test
- Type-safe dengan TypeScript

### 2.3 CRUD Operations

**Create:**
```typescript
const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  dispatch({ type: 'ADD_TASK', payload: newTask });
};
```

**Read:**
```typescript
const loadTasks = async () => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored) {
    dispatch({ type: 'FETCH_TASKS', payload: JSON.parse(stored) });
  }
};
```

**Update:**
```typescript
const updateTask = (task: Task) => {
  dispatch({ type: 'UPDATE_TASK', payload: task });
};
```

**Delete:**
```typescript
const deleteTask = (id: string) => {
  dispatch({ type: 'DELETE_TASK', payload: id });
};
```

### 2.4 Custom Hook

File: [`src/hooks/useTasks.ts`](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/hooks/useTasks.ts)

```typescript
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
```

**Keuntungan Custom Hook:**
- Encapsulation logic
- Reusable across components
- Clean API
- Error handling built-in

### 2.5 AsyncStorage Integration

```typescript
const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

useEffect(() => {
  if (state.tasks.length > 0) {
    saveTasks(state.tasks);
  }
}, [state.tasks]);
```

**Persistence Strategy:**
- Auto-save setiap kali state berubah
- Load on app mount
- Key: `@TaskMate:tasks`

### 2.6 Analisis: Redux vs Context API

**Kapan Menggunakan Context API:**
- Aplikasi skala kecil-menengah (< 50 screens)
- State tidak terlalu kompleks
- Tidak perlu middleware (saga, thunk)
- Team kecil (1-3 developer)
- **TaskMate cocok menggunakan Context API**

**Kapan Menggunakan Redux:**
- Aplikasi skala besar (> 50 screens)
- State kompleks dengan banyak interdependensi
- Perlu middleware untuk async logic
- Team besar (> 5 developer)
- Perlu time-travel debugging
- Perlu strict state management patterns

**Contoh Skenario Redux Lebih Tepat:**
Jika TaskMate berkembang dengan fitur:
- Real-time collaboration (WebSocket)
- Offline-first dengan sync queue
- Complex permission system
- Analytics tracking
- Undo/redo functionality

Maka Redux Toolkit dengan middleware seperti Redux-Saga atau RTK Query akan lebih tepat.

---

## BAGIAN 3: ANALISIS KRITIS & EVALUASI (20%)

### 📄 File REFLECTION.md
Analisis kritis lengkap dapat dilihat di: [REFLECTION.md](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/REFLECTION.md)

### 3.1 Kelemahan Arsitektur Jika 10x Fitur

**Kelemahan Identifikasi:**

1. **Single Context Bottleneck**
   - Saat ini semua task state dalam 1 context
   - Jika ada 10x fitur (projects, comments, notifications, files, analytics, audit logs, permissions, integrations, reports, settings), semua akan masuk ke context yang sama
   - Re-render berlebihan karena semua component subscribe ke 1 context

2. **Flat Route Structure**
   - Route saat ini: `/login`, `/(tabs)`, `/task/[id]`
   - Dengan 10x fitur, akan ada puluhan route tanpa grouping
   - Sulit maintain dan navigate

3. **No Data Fetching Layer**
   - Saat ini data fetching manual di context
   - Tidak ada caching, retry, pagination, invalidation
   - Setiap fitur baru harus implement sendiri

**Usulan Perbaikan:**

1. **Feature-Based Architecture**
```
src/
├── features/
│   ├── auth/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── types/
│   ├── tasks/
│   ├── projects/
│   ├── notifications/
│   └── ...
```

2. **React Query / TanStack Query**
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
  staleTime: 5 * 60 * 1000,
});
```

3. **Route Grouping**
```
app/
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
├── (main)/
│   ├── (tabs)/
│   └── ...
└── (settings)/
```

### 3.2 Restrukturisasi untuk 5 Developer

**Strategi:**

1. **Domain-Based Context Splitting**
```typescript
<AuthProvider>
  <TaskProvider>
    <ProjectProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ProjectProvider>
  </TaskProvider>
</AuthProvider>
```

2. **Code Ownership**
- Developer A: Auth & User Management
- Developer B: Tasks & Projects
- Developer C: Notifications & Real-time
- Developer D: Analytics & Reports
- Developer E: Settings & Integrations

3. **Collaboration Tools**
- Conventional Commits
- Husky pre-commit hooks
- ESLint + Prettier
- TypeScript strict mode
- Pull Request reviews
- CI/CD pipeline

4. **Module Boundaries**
```typescript
// features/tasks/index.ts
export { TaskProvider, useTasks } from './context';
export { TaskList, TaskDetail } from './screens';
export type { Task, TaskStatus } from './types';
```

### 3.3 Security Concerns & Solusi

**Concern 1: API - No HTTPS**
- **Problem:** Data transmitted over HTTP dapat disadap
- **Impact:** Credentials, task data, tokens exposed
- **Solution:**
  ```typescript
  const apiClient = create({
    baseURL: 'https://api.taskmate.devnusa.com', // HTTPS wajib
    timeout: 10000,
  });
  
  // Certificate pinning
  import { configureCertificatePinning } from 'react-native-ssl-pinning';
  configureCertificatePinning({
    'api.taskmate.devnusa.com': {
      includeSubdomains: true,
      publicKeyHashes: ['sha256/AAAAAAAAAA...'],
    },
  });
  ```

**Concern 2: API - No Authentication**
- **Problem:** API endpoints tidak terproteksi
- **Impact:** Unauthorized access, data manipulation
- **Solution:**
  ```typescript
  // JWT Token
  apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Token refresh
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        const newToken = await refreshAccessToken(refreshToken);
        await SecureStore.setItemAsync('access_token', newToken);
        return apiClient.request(error.config);
      }
      return Promise.reject(error);
    }
  );
  ```

**Concern 3: AsyncStorage - Plaintext Storage**
- **Problem:** Data disimpan tanpa enkripsi
- **Impact:** Sensitive data readable jika device compromised
- **Solution:**
  ```typescript
  // Gunakan expo-secure-store
  import * as SecureStore from 'expo-secure-store';
  
  const saveSecure = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };
  
  const getSecure = async (key: string) => {
    return await SecureStore.getItemAsync(key);
  };
  
  // Untuk iOS: Keychain
  // Untuk Android: EncryptedSharedPreferences
  ```

**Concern 4: AsyncStorage - No Integrity Check**
- **Problem:** Data dapat dimodifikasi tanpa deteksi
- **Impact:** Task status manipulation, data corruption
- **Solution:**
  ```typescript
  import CryptoJS from 'crypto-js';
  
  const saveWithIntegrity = async (key: string, data: any) => {
    const jsonData = JSON.stringify(data);
    const hash = CryptoJS.SHA256(jsonData).toString();
    
    await AsyncStorage.setItem(key, jsonData);
    await AsyncStorage.setItem(`${key}_hash`, hash);
  };
  
  const loadWithIntegrity = async (key: string) => {
    const jsonData = await AsyncStorage.getItem(key);
    const storedHash = await AsyncStorage.getItem(`${key}_hash`);
    
    if (jsonData && storedHash) {
      const computedHash = CryptoJS.SHA256(jsonData).toString();
      if (computedHash !== storedHash) {
        throw new Error('Data integrity check failed');
      }
      return JSON.parse(jsonData);
    }
    return null;
  };
  ```

---

## KESIMPULAN

Aplikasi TaskMate berhasil diimplementasikan dengan:
- ✅ Arsitektur bersih dengan separation of concerns
- ✅ Navigasi hybrid Stack + Tab yang intuitif
- ✅ State management dengan Context API + useReducer
- ✅ CRUD operations lengkap dengan persistence
- ✅ TypeScript untuk type safety
- ✅ Analisis mendalam terhadap scalability dan security

### 📁 Referensi File di GitHub

| Dokumentasi | Link |
|-------------|------|
| Repository | https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid |
| REFLECTION.md (Analisis Kritis) | [REFLECTION.md](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/REFLECTION.md) |
| README.md | [README.md](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/README.md) |
| Development Guide | [Development-Manual-Debugging.md](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/Development-Manual-Debugging.md) |

### 📂 Struktur Kode (File Links)

| Komponen | Path | Link |
|----------|------|------|
| **Navigasi** | | |
| Root Layout | app/_layout.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/_layout.tsx) |
| Tab Layout | app/(tabs)/_layout.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/_layout.tsx) |
| **Screens** | | |
| Login | app/login.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/login.tsx) |
| Task List | app/(tabs)/index.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/index.tsx) |
| Dashboard | app/(tabs)/explore.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/(tabs)/explore.tsx) |
| Task Detail | app/task/[id].tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/app/task/[id].tsx) |
| **State Management** | | |
| TaskContext | src/context/TaskContext.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/context/TaskContext.tsx) |
| TaskReducer | src/context/taskReducer.ts | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/context/taskReducer.ts) |
| Custom Hook | src/hooks/useTasks.ts | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/hooks/useTasks.ts) |
| **UI & Utils** | | |
| TaskCard | src/components/TaskCard.tsx | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/components/TaskCard.tsx) |
| Theme | src/constants/theme.ts | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/constants/theme.ts) |
| API Service | src/services/api.ts | [View](https://github.com/411251181/UTS-PemrogramanMobile-411251181-BayuFarid/blob/master/src/services/api.ts) |

---

**Commit:** `decdbe2` - feat: implement TaskMate with Stack+Tab navigation, Context API+useReducer, CRUD operations, and REFLECTION.md analysis

**Nama:** Bayu Farid  
**NIM:** 411251181  
**Tanggal:** 13 Mei 2026