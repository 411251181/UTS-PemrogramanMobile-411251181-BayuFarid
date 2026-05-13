// theme.ts
// ============================================================================
// THEME CONSTANTS
// ============================================================================
// Centralized theme configuration for consistent styling across the app
// Includes TypeScript interfaces for type safety
// ============================================================================

// Type definitions for theme
export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  background: { light: string; dark: string };
  card: { light: string; dark: string };
  text: {
    primary: { light: string; dark: string };
    secondary: { light: string; dark: string };
  };
  border: { light: string; dark: string };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface FontSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface StatusColors {
  pending: string;
  in_progress: string;
  completed: string;
}

export interface PriorityColors {
  low: string;
  medium: string;
  high: string;
}

export interface Theme {
  COLORS: ColorPalette;
  SPACING: Spacing;
  FONT_SIZES: FontSizes;
  BORDER_RADIUS: BorderRadius;
  STATUS_COLORS: StatusColors;
  PRIORITY_COLORS: PriorityColors;
}

export const COLORS: ColorPalette = {
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

export const SPACING: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES: FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const BORDER_RADIUS: BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

// Status color mapping
export const STATUS_COLORS: StatusColors = {
  pending: '#FF9500',
  in_progress: '#007AFF',
  completed: '#34C759',
};

// Priority color mapping
export const PRIORITY_COLORS: PriorityColors = {
  low: '#34C759',
  medium: '#FF9500',
  high: '#FF3B30',
};

const theme: Theme = {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  STATUS_COLORS,
  PRIORITY_COLORS,
};

export default theme;
