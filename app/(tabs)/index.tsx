import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import TaskCard from '@/src/components/TaskCard';
import { COLORS } from '@/src/constants/theme';
import { useTasks } from '@/src/hooks/useTasks';

export default function TaskListScreen() {
  const { state, addTask } = useTasks();
  const [title, setTitle] = useState('');

  const stats = useMemo(() => {
    const completed = state.tasks.filter((task) => task.status === 'completed').length;
    return `${completed}/${state.tasks.length} completed`;
  }, [state.tasks]);

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: 'Task baru dari form cepat TaskMate.',
      status: 'pending',
      priority: 'medium',
      assignee: 'DevNusa Team',
      dueDate: new Date().toISOString().slice(0, 10),
    });
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Team Tasks</Text>
        <Text style={styles.summaryText}>{stats}</Text>
      </View>

      <View style={styles.quickAdd}>
        <TextInput
          onChangeText={setTitle}
          placeholder="Tambah task cepat..."
          style={styles.input}
          value={title}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Tambah</Text>
        </Pressable>
      </View>

      {state.error ? <Text style={styles.error}>{state.error}</Text> : null}

      <FlatList
        data={state.tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => router.push(`/task/${item.id}`)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada task.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.light,
    flex: 1,
    padding: 16,
  },
  summary: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginBottom: 16,
    padding: 18,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  summaryText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  quickAdd: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: COLORS.border.light,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.success,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    paddingBottom: 24,
  },
  error: {
    color: COLORS.danger,
    marginBottom: 8,
  },
  empty: {
    color: COLORS.text.secondary.light,
    textAlign: 'center',
  },
});