import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../context/taskReducer';
import { COLORS, PRIORITY_COLORS, STATUS_COLORS } from '../constants/theme';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={[styles.badge, { backgroundColor: PRIORITY_COLORS[task.priority] }]}>
          <Text style={styles.badgeText}>{task.priority.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.assignee}>👤 {task.assignee}</Text>
        <View style={[styles.status, { borderColor: STATUS_COLORS[task.status] }]}>
          <Text style={[styles.statusText, { color: STATUS_COLORS[task.status] }]}>
            {task.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card.light,
    borderRadius: 14,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    color: COLORS.text.primary.light,
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  description: {
    color: COLORS.text.secondary.light,
    fontSize: 14,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  assignee: {
    color: COLORS.text.secondary.light,
    fontSize: 13,
  },
  status: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dueDate: {
    color: COLORS.text.secondary.light,
    fontSize: 12,
    marginTop: 8,
  },
});