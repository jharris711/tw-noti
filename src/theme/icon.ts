import { IconTheme } from '../types/Theme';

export const icon: IconTheme = {
  h: 'h-8',
  w: 'w-8',
  error: {
    altText: 'Big X icon',
    text: {
      dark: 'dark:text-red-200',
      light: 'text-red-500',
    },
    bg: {
      dark: 'dark:bg-red-800',
      light: 'bg-red-100',
    },
  },
  info: {
    altText: 'Info Circle icon',
    text: {
      dark: 'dark:text-blue-200',
      light: 'text-blue-500',
    },
    bg: {
      dark: 'dark:bg-blue-800',
      light: 'bg-blue-100',
    },
  },
  success: {
    altText: 'Checkmark icon',
    text: {
      dark: 'dark:text-green-200',
      light: 'text-green-500',
    },
    bg: {
      dark: 'dark:bg-green-800',
      light: 'bg-green-100',
    },
  },
  warning: {
    altText: 'Warning icon',
    text: {
      dark: 'dark:text-orange-200',
      light: 'text-orange-500',
    },
    bg: {
      dark: 'dark:bg-orange-800',
      light: 'bg-orange-100',
    },
  },
};
