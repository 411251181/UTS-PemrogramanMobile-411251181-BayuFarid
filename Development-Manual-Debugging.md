# Development Manual & Debugging Guide - TaskMate

## 📋 Overview

Dokumen ini berisi panduan untuk **manual testing** dan **debugging** aplikasi TaskMate menggunakan Expo Go atau emulator Android/iOS.

---

## 🚀 Cara Menjalankan Aplikasi

### Pre-check sebelum Debugging

Jalankan dari folder project:

```bash
cd TaskMate
npx expo-doctor
```

Jika muncul warning seperti ini:

```text
@react-native-async-storage/async-storage@3.0.2 - expected version: 2.2.0
```

Artinya versi package tidak sesuai dengan Expo SDK yang terpasang. Perbaiki dengan:

```bash
npx expo install @react-native-async-storage/async-storage
npx expo start --clear
```

> Gunakan `npx expo install`, bukan `npm install`, karena Expo akan memilih versi dependency yang kompatibel dengan SDK project.

### Metode 1: Expo Go (Recommended untuk Development)

1. **Start Expo Development Server:**
   ```bash
   cd TaskMate
   npx expo start --clear
   ```

2. **Buka Aplikasi:**
   - **Android:** Scan QR code dengan aplikasi Expo Go
   - **iOS device fisik:** Scan QR code dengan Camera app atau Expo Go
   - **Web:** Tekan `w` di terminal untuk membuka di browser

3. **Arti output terminal:**
   ```text
   › Metro waiting on exp://192.168.x.x:8081
   › Web is waiting on http://localhost:8081
   › Press a │ open Android
   › Press i │ open iOS simulator
   › Press j │ open debugger
   ```
   - `Metro waiting` berarti server berjalan normal.
   - QR code dipakai untuk membuka app di Expo Go.
   - Tekan `j` untuk membuka debugger.
   - Tekan `Ctrl+C` untuk menghentikan server.
   - Jika muncul `Stopped server`, itu berarti server berhenti karena Anda menekan `Ctrl+C` atau terminal ditutup.

4. **Hot Reload:**
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

`npx expo start --ios` hanya bisa berjalan jika Xcode sudah terinstall lengkap.

1. **Install Xcode dari App Store.**

2. **Set command line tools Xcode:**
   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -license accept
   ```

3. **Buka Xcode minimal sekali:**
   - Buka aplikasi Xcode
   - Tunggu proses installing components selesai
   - Buka menu `Xcode > Settings > Platforms`
   - Pastikan iOS Simulator runtime tersedia

4. **Cek simulator tersedia:**
   ```bash
   xcrun simctl list devices available
   ```

5. **Start dengan iOS Simulator:**
   ```bash
   npx expo start --ios
   ```

6. **Atau specify simulator:**
   ```bash
   npx expo start --ios --simulator="iPhone 15"
   ```

Jika muncul pesan:

```text
Xcode must be fully installed before you can continue
```

Penyebabnya bukan error Context API. Itu berarti Xcode belum lengkap atau command line tools belum diarahkan ke Xcode. Selesaikan langkah 1-4, lalu jalankan ulang Expo CLI.

---

## ✅ Cara Debugging Context API dengan Benar

### 1. Pastikan masalah bukan dari environment

Sebelum menyimpulkan error berasal dari Context API, cek terminal:

| Log Terminal | Arti | Tindakan |
|-------------|------|----------|
| `Metro waiting on exp://...` | Server Expo normal | Lanjut scan QR / buka simulator |
| `@react-native-async-storage... expected version` | Dependency tidak cocok dengan Expo SDK | Jalankan `npx expo install @react-native-async-storage/async-storage` |
| `Xcode must be fully installed` | iOS Simulator belum siap | Install/setup Xcode |
| `Unable to resolve module` | Import/path bermasalah | Cek path import lalu clear cache |
| `Context Not Accessible` / custom error hook | Provider belum membungkus screen | Cek `TaskProvider` di `app/_layout.tsx` |

### 2. Test Context Provider

Pastikan `TaskProvider` membungkus seluruh route di `app/_layout.tsx`.

Checklist:
- [ ] App tidak crash saat membuka Login
- [ ] Task List bisa membaca `tasks`
- [ ] Add/Edit/Delete memanggil action reducer
- [ ] Dashboard ikut berubah setelah task berubah

### 3. Test Reducer Flow

Tambahkan log sementara di `src/context/taskReducer.ts`:

```typescript
console.log('[TaskReducer]', action.type, action.payload);
```

Expected saat testing:
- Add task → muncul `ADD_TASK`
- Edit task → muncul `UPDATE_TASK`
- Delete task → muncul `DELETE_TASK`
- Fetch awal → muncul `FETCH_TASKS`

Hapus log setelah debugging selesai.

### 4. Test AsyncStorage Persistence

Tambahkan log sementara di `src/context/TaskContext.tsx` setelah save/load:

```typescript
console.log('[AsyncStorage] tasks:', tasks);
```

Flow test:
1. Tambah task baru
2. Reload app dengan tekan `r`
3. Pastikan task masih ada
4. Jika hilang, cek warning versi AsyncStorage dan jalankan:
   ```bash
   npx expo install @react-native-async-storage/async-storage
   npx expo start --clear
   ```

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

### Issue 2: AsyncStorage Version Warning

```
@react-native-async-storage/async-storage@3.0.2 - expected version: 2.2.0
```

**Penyebab:** versi AsyncStorage tidak sesuai dengan Expo SDK.

**Solution:**
```bash
npx expo install @react-native-async-storage/async-storage
npx expo start --clear
```

Setelah install, cek versi:

```bash
npm ls @react-native-async-storage/async-storage
```

### Issue 3: AsyncStorage Data Not Persisting

**Check:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Verify storage
const data = await AsyncStorage.getItem('@TaskMate:tasks');
console.log('Stored data:', data);
```

### Issue 4: Navigation Not Working

**Check:**
```typescript
// Pastikan router di-import dengan benar
import { router } from 'expo-router';

// Gunakan replace untuk menghindari back navigation ke login
router.replace('/(tabs)');

// Gunakan push untuk navigation stack
router.push('/task/123');
```

### Issue 5: Context Not Accessible

**Check:**
```typescript
// Pastikan provider dibungkus di layout
// app/_layout.tsx harus punya TaskProvider

// Gunakan hook dengan benar
const { tasks, loading, addTask } = useTasks();
```

Jika hook `useTasks()` dipanggil di luar `TaskProvider`, biasanya muncul error seperti:

```text
useTasks must be used within a TaskProvider
```

**Solution:**
- Pastikan `TaskProvider` berada di root layout.
- Jangan memanggil `useTasks()` di file yang berada di luar tree provider.
- Untuk debug, pasang `console.log('[TaskProvider] mounted')` di provider.

### Issue 6: iOS Simulator Tidak Bisa Dibuka

```
Xcode must be fully installed before you can continue
```

**Penyebab:** Xcode belum terinstall penuh atau command line tools belum diset.

**Solution:**
```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
xcrun simctl list devices available
npx expo start --ios
```

Jika Xcode belum ada, install dulu dari App Store. Untuk sementara gunakan Expo Go di device fisik atau web dengan:

```bash
npx expo start --clear
```

### Issue 7: TypeScript Errors

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