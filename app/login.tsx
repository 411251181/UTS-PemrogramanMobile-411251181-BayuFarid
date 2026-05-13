import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS } from '@/src/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('bayu@devnusa.id');
  const [password, setPassword] = useState('taskmate123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validation
      if (!email.trim() || !password.trim()) {
        setError('Email dan password harus diisi.');
        return;
      }

      if (!email.includes('@')) {
        setError('Format email tidak valid.');
        return;
      }

      if (password.length < 6) {
        setError('Password minimal 6 karakter.');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Success - navigate to tabs
      router.replace('/(tabs)');
    } catch (err) {
      setError('Terjadi kesalahan saat login. Coba lagi.');
      Alert.alert('Login Error', 'Gagal terhubung ke server. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TaskMate</Text>
      <Text style={styles.subtitle}>Internal task manager for DevNusa team</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        value={email}
      />

      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Pressable 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Masuk</Text>
        )}
      </Pressable>

      <Text style={styles.note}>
        Demo login menggunakan validasi lokal. Pada produksi, login harus memakai API HTTPS,
        token singkat, refresh token aman, dan secure storage.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.light,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.text.secondary.light,
    fontSize: 16,
    marginBottom: 32,
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: COLORS.border.light,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 12,
    padding: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 8,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    color: COLORS.text.secondary.light,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});