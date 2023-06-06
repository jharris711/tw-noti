import { ButtonTheme } from '../types/Theme';

export const button: ButtonTheme = {
  h: 'h-8',
  w: 'w-8',
  text: {
    dark: 'dark:text-gray-500',
    light: 'text-gray-400',
    hover: {
      dark: 'dark:hover:text-white',
      light: 'hover:text-gray-900',
    },
  },
  bg: {
    dark: 'dark:bg-gray-800',
    light: 'bg-white',
    hover: {
      dark: 'dark:hover:bg-gray-700',
      light: 'hover:bg-gray-100',
    },
  },
};
