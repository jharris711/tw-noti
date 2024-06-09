import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { defaultTheme } from '@/theme/defaultTheme';

import { ToastIcon } from './ToastIcon';

describe('Toast Icon Component', () => {
  test('should render the component', () => {
    render(<ToastIcon theme={defaultTheme.icon} type='info' />);

    const { classes } = defaultTheme.icon.classes['info'];

    const toastIcon = screen.getByTestId('toast-icon');

    expect(toastIcon).toBeInTheDocument();
    expect(toastIcon).toHaveClass(classes);
  });

  const types = ['info', 'success', 'warning', 'error'];
  types.forEach((type) => {
    test(`should render the component for type ${type}`, () => {
      render(<ToastIcon theme={defaultTheme.icon} type={type} />);

      const { classes, altText } = defaultTheme.icon.classes[type];

      const toastIcon = screen.getByTestId('toast-icon');

      expect(toastIcon).toBeInTheDocument();
      expect(toastIcon).toHaveClass(classes);

      const icon = toastIcon.querySelector('svg');
      expect(icon).toBeInTheDocument();

      const srText = screen.getByText(altText);
      expect(srText).toHaveClass('sr-only');
    });
  });
});
