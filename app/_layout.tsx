import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { TaskProvider } from '@/src/context/TaskContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Stack dipakai untuk flow utama: Login -> Tabs -> Detail.
// Tab dipakai di dalam folder (tabs) agar area utama aplikasi mudah diperluas.
// Kombinasi ini menjaga separation of concerns: auth flow, tab flow, dan detail flow terpisah.
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TaskProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="login">
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="task/[id]" options={{ title: 'Task Detail' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TaskProvider>
  );
}