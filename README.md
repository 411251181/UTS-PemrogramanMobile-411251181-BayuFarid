# TaskMate - DevNusa Internal Task Manager

TaskMate adalah aplikasi mobile internal untuk mengelola tugas antar anggota tim DevNusa. Project dibuat dengan Expo React Native dan TypeScript.

## Fitur Utama

- Login Screen dengan validasi lokal
- Task List Screen
- Task Detail Screen
- Dashboard ringkasan task
- CRUD task:
  - Create task cepat
  - Read task list
  - Update task detail
  - Delete task
- Persistence menggunakan AsyncStorage
- State management dengan Context API + useReducer
- Navigasi gabungan Stack + Tab menggunakan Expo Router/React Navigation
- API service simulation menggunakan Axios

## Struktur Folder

```txt
TaskMate/
├── app/
│   ├── _layout.tsx              # Root Stack: login, tabs, detail
│   ├── login.tsx                # Login Screen
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Bottom Tab Navigator
│   │   ├── index.tsx            # Task List Screen
│   │   └── explore.tsx          # Dashboard Screen
│   └── task/
│       └── [id].tsx             # Task Detail Screen
├── src/
│   ├── components/
│   │   └── TaskCard.tsx         # Reusable task card
│   ├── constants/
│   │   └── theme.ts             # Color, spacing, style constants
│   ├── context/
│   │   ├── TaskContext.tsx      # Context Provider + CRUD operations
│   │   └── taskReducer.ts       # Reducer, action, state, task type
│   ├── hooks/
│   │   └── useTasks.ts          # Custom hook export
│   └── services/
│       └── api.ts               # Axios API simulation + security notes
├── REFLECTION.md                # Analisis kritis arsitektur, state, security
└── README.md
```

## Routing / Navigasi

| Route | Screen | Fungsi |
|---|---|---|
| `/login` | LoginScreen | Validasi login lokal |
| `/(tabs)` | TabLayout | Container tab utama |
| `/(tabs)/index` | TaskListScreen | Daftar task + create task |
| `/(tabs)/explore` | DashboardScreen | Statistik task |
| `/task/[id]` | TaskDetailScreen | Edit/delete task berdasarkan id |

## State Management

State dikelola melalui:

- `TaskProvider`
- `useReducer`
- `useTasks` custom hook
- AsyncStorage key: `@TaskMate:tasks`

Action reducer:

- `ADD_TASK`
- `UPDATE_TASK`
- `DELETE_TASK`
- `FETCH_TASKS`
- `SET_LOADING`
- `SET_ERROR`

## Data Dummy

Task awal otomatis dibuat jika AsyncStorage kosong:

1. Setup Project Structure
2. Implement Navigation
3. Implement State Management
4. Create Task CRUD Operations
5. Write Reflection Document

## API

File `src/services/api.ts` menggunakan Axios instance dengan base URL simulasi:

```txt
https://api.taskmate.devnusa.example.com
```

Endpoint belum real. Fungsi API dibuat sebagai simulasi:

- `fetchTasks`
- `createTask`
- `updateTask`
- `deleteTask`

## Cara Menjalankan

```bash
npm install
npm start
```

Lalu pilih platform:

```bash
npm run android
npm run ios
npm run web
```

## Testing Manual

Checklist:

- [ ] Login dengan email valid dan password minimal 6 karakter
- [ ] Masuk ke tab Tasks
- [ ] Tambah task cepat
- [ ] Buka detail task
- [ ] Ubah title, description, assignee, due date, status, priority
- [ ] Simpan perubahan
- [ ] Hapus task
- [ ] Cek dashboard berubah sesuai data task
- [ ] Restart app dan pastikan data tersimpan dari AsyncStorage

## Catatan Security

- AsyncStorage hanya digunakan untuk data non-sensitif.
- Token/password tidak boleh disimpan di AsyncStorage.
- Production harus memakai SecureStore/Keychain/Keystore.
- API production wajib HTTPS, certificate pinning, validasi token server-side, rate limiting, dan input validation.