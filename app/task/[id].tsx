import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS } from '@/src/constants/theme';
import { Task } from '@/src/context/taskReducer';
import { useTasks } from '@/src/hooks/useTasks';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, updateTask, deleteTask } = useTasks();

  const task = useMemo(() => state.tasks.find((item) => item.id === id), [id, state.tasks]);

  const [form, setForm] = useState<Task | null>(task ?? null);

  if (!task || !form) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Task tidak ditemukan.</Text>
      </View>
    );
  }

  const setValue = (key: keyof Task, value: string) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      Alert.alert('Validasi gagal', 'Judul task wajib diisi.');
      return;
    }

    updateTask(form);
    Alert.alert('Berhasil', 'Task berhasil diperbarui.');
  };

  const handleDelete = () => {
    deleteTask(task.id);
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: form.title }} />

      <Text style={styles.label}>Judul</Text>
      <TextInput value={form.title} onChangeText={(value) => setValue('title', value)} style={styles.input} />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        multiline
        value={form.description}
        onChangeText={(value) => setValue('description', value)}
        style={[styles.input, styles.textArea]}
      />

      <Text style={styles.label}>Assignee</Text>
      <TextInput value={form.assignee} onChangeText={(value) => setValue('assignee', value)} style={styles.input} />

      <Text style={styles.label}>Due Date</Text>
      <TextInput value={form.dueDate} onChangeText={(value) => setValue('dueDate', value)} style={styles.input} />

      <Text style={styles.label}>Status</Text>
      <View style={styles.row}>
        {(['pending', 'in_progress', 'completed'] as Task['status'][]).map((status) => (
          <Pressable
            key={status}
            onPress={() => setValue('status', status)}
            style={[styles.chip, form.status === status && styles.chipActive]}>
            <Text style={[styles.chipText, form.status === status && styles.chipTextActive]}>
              {status.replace('_', ' ')}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        {(['low', 'medium', 'high'] as Task['priority'][]).map((priority) => (
          <Pressable
            key={priority}
            onPress={() => setValue('priority', priority)}
            style={[styles.chip, form.priority === priority && styles.chipActive]}>
            <Text style={[styles.chipText, form.priority === priority && styles.chipTextActive]}>
              {priority}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Hapus Task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.light,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    color: COLORS.text.secondary.light,
  },
  label: {
    color: COLORS.text.primary.light,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: COLORS.border.light,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    padding: 12,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#fff',
    borderColor: COLORS.border.light,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.text.secondary.light,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#fff',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 24,
    padding: 16,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    marginTop: 10,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
  },
});