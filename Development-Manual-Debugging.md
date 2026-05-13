# Development Manual & Debugging Guide - TaskMate

## 📋 Overview

Dokumen ini berisi panduan untuk **manual testing** dan **debugging** aplikasi TaskMate menggunakan Expo Go atau emulator Android/iOS.

---

## 🚀 Cara Menjalankan Aplikasi

### Metode 1: Expo Go (Recommended untuk Development)

1. **Start Expo Development Server:**
   ```bash
   cd TaskMate
   npx expo start --clear
   ```

2. **Buka Aplikasi:**
   - **Android:** Scan QR code dengan aplikasi Expo Go
   - **iOS:** Scan QR code dengan Camera app (iOS 13+)
   - **Web:** Tekan `w` di terminal untuk membuka di browser

3. **Hot Reload:**
   - Tekan `r` di terminal untuk reload
   - Atau shake device dan pilih "Reload"

### Metode 2: Emulator Android

1. **Start dengan Android Emulator:**
   ```bash
   npx expo start --android
   ```

2. **Pastikan emulator sudah running:**
   ```bash
   # List emulator yang tersedia
   emulator -list-avds
   
   # Start emulator
   emulator @nama-emulator
   ```

### Metode 3: iOS Simulator (macOS only)

1. **Start dengan iOS Simulator:**
   ```bash
   npx expo start --ios
   ```

2. **Atau specify simulator:**
   ```bash
   npx expo start --ios --simulator="iPhone 15"
   ```

---

## 🧪 Manual Testing Checklist

### 1. Login Screen Testing

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Login berhasil | Masukkan email valid & password ≥6 karakter | Navigasi ke Tab Navigator | ⬜ |
| Empty email | Kosongkan email, isi password | Error: "Email dan password harus diisi" | ⬜ |
| Invalid email | Masukkan "bayufarid" tanpa @ | Error: "Format email tidak valid" | ⬜ |
| Short password | Email valid, password "123" | Error: "Password minimal 6 karakter" | ⬜ |
| Loading state | Klik "Masuk" | Button show ActivityIndicator, disabled | ⬜ |
| Network error | Matikan internet, klik "Masuk" | Error alert popup | ⬜ |

**Test Credentials:**
- Email: `bayu@devnusa.id`
- Password: `taskmate123`

### 2. Task List Screen Testing

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View task list | Buka Tab "Tugas" | FlatList menampilkan semua task | ⬜ |
| Filter tabs | Klik tab status (Semua/Pending/In Progress/Selesai) | List terfilter sesuai status | ⬜ |
| Add task | Klik "+" FAB, isi form, klik "Simpan" | Task baru muncul di list | ⬜ |
| Empty state | Hapus semua task | Text "Belum ada tugas" tampil | ⬜ |
| Pull to refresh | Pull down di list | Data direfresh | ⬜ |
| Task card tap | Klik task card | Navigasi ke Task Detail | ⬜ |

### 3. Task Detail Screen Testing

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View task detail | Klik task di list | Menampilkan semua field task | ⬜ |
| Edit task | Rubah field, klik "Update" | Task terupdate, kembali ke list | ⬜ |
| Delete task | Klik "Hapus", konfirmasi | Task dihapus, kembali ke list | ⬜ |
| Cancel edit | Klik "Batal" | Kembali ke list tanpa perubahan | ⬜ |
| Invalid form | Kosongkan judul | Error "Judul wajib diisi" | ⬜ |
| Status dropdown | Klik dropdown status | Menampilkan 3 opsi | ⬜ |
| Priority dropdown | Klik dropdown prioritas | Menampilkan 3 opsi | ⬜ |

### 4. Dashboard Screen Testing

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View dashboard | Buka Tab "Dashboard" | Menampilkan statistik task | ⬜ |
| Stats accuracy | Buat/hapus task | Counter stats berubah | ⬜ |
| Progress bar | View progress | Bar menunjukkan rasio completed/total | ⬜ |

### 5. Data Persistence Testing

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Data survive restart | Buat task, close app, reopen | Task masih ada | ⬜ |
| Clear data | Hapus app, reinstall | Task hilang (AsyncStorage cleared) | ⬜ |
| Multiple devices | Buat task di HP A | Task TIDAK muncul di HP B (local storage) | ⬜ |

---

## 🔧 Debugging Tools

### 1. React Native Debugger

```bash
# Install React Native Debugger
brew install --cask react-native-debugger

# Run dengan debugger
npx expo start --dev-client
```

### 2. Expo Debug Menu

**Android:**
- Shake device atau `adb shell input keyevent 82`

**iOS:**
- Shake device atau `Cmd + D`

**Menu Options:**
- `Toggle Element Inspector`
- `Toggle Network Inspector`
- `Show Performance Overlay`
- `Reload`
- `Enable Fast Refresh`

### 3. Console Logging

```typescript
// Di file yang ingin di-debug
import { LogBox } from 'react-native';

// Aktifkan semua warnings
LogBox.ignoreAllLogs(false);

// Custom log dengan tag
console.log('[TaskMate] Task created:', task);
console.warn('[TaskMate] Warning:', message);
console.error('[TaskMate] Error:', error);
```

### 4. Network Debugging

```bash
# Install mitmproxy untuk intercept HTTP traffic
brew install mitmproxy

# Run proxy
mitmproxy

# Setup device untuk menggunakan proxy
# Android: Settings > WiFi > Long press network > Modify network > Advanced
# iOS: Settings > WiFi > Select network > Configure Proxy
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Metro Bundler Error

```
Unable to resolve module @/src/...
```

**Solution:**
```bash
# Clear Metro cache
npx expo start --clear

# Atau rebuild
npx expo start --reset-cache
```

### Issue 2: AsyncStorage Data Not Persisting

**Check:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Verify storage
const data = await AsyncStorage.getItem('@TaskMate:tasks');
console.log('Stored data:', data);
```

### Issue 3: Navigation Not Working

**Check:**
```typescript
// Pastikan router di-import dengan benar
import { router } from 'expo-router';

// Gunakan replace untuk menghindari back navigation ke login
router.replace('/(tabs)');

// Gunakan push untuk navigation stack
router.push('/task/123');
```

### Issue 4: Context Not Accessible

**Check:**
```typescript
// Pastikan provider dibungkus di layout
// app/_layout.tsx harus punya TaskProvider

// Gunakan hook dengan benar
const { tasks, loading, addTask } = useTasks();
```

### Issue 5: TypeScript Errors

```bash
# Run TypeScript check
npx tsc --noEmit

# Fix common issues
npx expo install --fix
```

---

## 📱 Device-Specific Testing

### Android Testing Checklist

- [ ] Test pada minimal 2 Android versions (Android 11 & 13)
- [ ] Test pada berbagai screen sizes (phone & tablet)
- [ ] Test notch/punch-hole display
- [ ] Test gesture navigation vs 3-button navigation
- [ ] Test dark mode (system setting)

### iOS Testing Checklist

- [ ] Test pada iPhone SE, 13, 14, 15 series
- [ ] Test notch/Dynamic Island
- [ ] Test home indicator
- [ ] Test Face ID / Touch ID integration
- [ ] Test dark mode

---

## 📊 Testing Report Template

```markdown
## Testing Report - [DATE]

### Device Info
- Device: [Nama Device]
- OS: [iOS/Android version]
- App Version: [version]

### Test Results
| Feature | Status | Notes |
|---------|--------|-------|
| Login | ✅/❌ | [notes] |
| Task List | ✅/❌ | [notes] |
| Task Detail | ✅/❌ | [notes] |
| Dashboard | ✅/❌ | [notes] |
| Persistence | ✅/❌ | [notes] |

### Bugs Found
1. [Bug description]
2. [Bug description]

### Screenshots
[screenshot links]
```

---

## 🎯 Quick Test Script

Jalankan test sequence ini untuk verifikasi fitur utama:

1. **Login Flow:** Valid credentials → Success → Tab navigator
2. **CRUD Flow:** Add task → View → Edit → Delete
3. **Navigation Flow:** Login → List → Detail → Back → Tabs
4. **Persistence Flow:** Add task → Close app → Reopen → Task exists

---

## 📞 Resources

- Expo Documentation: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- AsyncStorage: https://react-native-async-storage.github.io/async-storage/
- React Native Debugger: https://github.com/jhen0409/react-native-debugger

---

*Last Updated: 13 Mei 2026*
*Author: Bayu Farid - DevNusa*