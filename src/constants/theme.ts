// theme.ts
// ============================================================================
// THEME CONSTANTS
// ============================================================================
// Centralized theme configuration for consistent styling across the app
// ============================================================================

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: {
    light: '#F2F2F7',
    dark: '#000000',
  },
  card: {
    light: '#FFFFFF',
    dark: '#1C1C1E',
  },
  text: {
    primary: {
      light: '#000000',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#3C3C43',
      dark: '#EBEBF5',
    },
  },
  border: {
    light: '#C6C6C8',
    dark: '#38383A',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

// Status color mapping
export const STATUS_COLORS = {
  pending: '#FF9500',
  in_progress: '#007AFF',
  completed: '#34C759',
};

// Priority color mapping
export const PRIORITY_COLORS = {
  low: '#34C759',
  medium: '#FF9500',
  high: '#FF3B30',
};

export default {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  STATUS_COLORS,
  PRIORITY_COLORS,
};