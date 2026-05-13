import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS } from '@/src/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('bayu@devnusa.id');
  const [password, setPassword] = useState('taskmate123');

  const handleLogin = () => {
    if (!email.includes('@') || password.length < 6) {
      Alert.alert('Login gagal', 'Email harus valid dan password minimal 6 karakter.');
      return;
    }

    router.replace('/(tabs)');
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

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
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
});