import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/src/constants/theme';
import { useTasks } from '@/src/hooks/useTasks';

export default function DashboardScreen() {
  const { state } = useTasks();

  const totals = useMemo(() => {
    return {
      pending: state.tasks.filter((task) => task.status === 'pending').length,
      progress: state.tasks.filter((task) => task.status === 'in_progress').length,
      completed: state.tasks.filter((task) => task.status === 'completed').length,
      high: state.tasks.filter((task) => task.priority === 'high').length,
    };
  }, [state.tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard DevNusa</Text>
      <Text style={styles.subtitle}>Ringkasan workload internal TaskMate</Text>

      <View style={styles.grid}>
        <StatCard label="Pending" value={totals.pending} color={COLORS.warning} />
        <StatCard label="In Progress" value={totals.progress} color={COLORS.primary} />
        <StatCard label="Completed" value={totals.completed} color={COLORS.success} />
        <StatCard label="High Priority" value={totals.high} color={COLORS.danger} />
      </View>
    </View>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.light,
    flex: 1,
    padding: 16,
  },
  title: {
    color: COLORS.text.primary.light,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.text.secondary.light,
    fontSize: 15,
    marginBottom: 18,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    width: '48%',
  },
  value: {
    fontSize: 34,
    fontWeight: '900',
  },
  label: {
    color: COLORS.text.secondary.light,
    fontSize: 14,
    marginTop: 4,
  },
});