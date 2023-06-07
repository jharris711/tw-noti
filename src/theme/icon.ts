import { Theme } from '../types/Theme';

export const icon: Theme['icon'] = {
  classes: {
    error: {
      altText: 'Big X icon',
      classes:
        'h-8 w-8 inline-flex items-center justify-center flex-shrink-0 rounded-lg dark:text-red-200 text-red-500 dark:bg-red-800 bg-red-100',
    },
    info: {
      altText: 'Info Circle icon',
      classes:
        'h-8 w-8 inline-flex items-center justify-center flex-shrink-0 rounded-lg dark:text-blue-200 text-blue-500 dark:bg-blue-800 bg-blue-100',
    },
    success: {
      altText: 'Checkmark icon',
      classes:
        'h-8 w-8 inline-flex items-center justify-center flex-shrink-0 rounded-lg dark:text-green-200 text-green-500 dark:bg-green-800 bg-green-100',
    },
    warning: {
      altText: 'Warning icon',
      classes:
        'h-8 w-8 inline-flex items-center justify-center flex-shrink-0 rounded-lg dark:text-orange-200 text-orange-500 dark:bg-orange-800 bg-orange-100',
    },
  },
};
