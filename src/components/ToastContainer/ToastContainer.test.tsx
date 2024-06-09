import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ToastContainer } from './ToastContainer';

describe('Toast container', () => {
  test('should render the component', () => {
    const theme = {
      classes: 'test'
    };

    render(<ToastContainer theme={theme}>Test</ToastContainer>);

    const component = screen.getByTestId('toast-container');

    expect(component).toBeInTheDocument();
    expect(component).toHaveClass(theme.classes);
  });
});
