import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ToastContext } from '../ToastContext/ToastContext';
import { Toaster } from './Toaster';

import { defaultTheme } from '@/theme/defaultTheme';
import { ToastContextProps } from '@/types/Toast';

const mockToast = {
  id: 1,
  content: 'Test Toast',
  type: 'info'
};

const mockContextValue: ToastContextProps = {
  reverseStackOrder: false,
  theme: defaultTheme,
  toasts: [mockToast],
  enqueueToast: vi.fn(),
  dequeueToast: vi.fn()
};

describe('Toaster Component', () => {
  test('should render the component', () => {
    render(
      <ToastContext.Provider value={mockContextValue}>
        <Toaster />
      </ToastContext.Provider>
    );

    const toastContainer = screen.getByTestId('toast-container');
    expect(toastContainer).toBeInTheDocument();
  });

  test('should render a toast', () => {
    render(
      <ToastContext.Provider value={mockContextValue}>
        <Toaster />
      </ToastContext.Provider>
    );

    const toast = screen.getByTestId('toast-0');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent('Test Toast');
  });

  test('should call dequeueToast when toast is closed', () => {
    render(
      <ToastContext.Provider value={mockContextValue}>
        <Toaster />
      </ToastContext.Provider>
    );

    const closeButton = screen.getByTestId('toast-0').querySelector('button');
    fireEvent.click(closeButton as Element);

    expect(mockContextValue.dequeueToast).toHaveBeenCalledWith(1);
  });

  test('should render toasts in reverse order when reverseStackOrder is true', () => {
    const reverseOrderContextValue = {
      ...mockContextValue,
      reverseStackOrder: true,
      toasts: [
        { id: 1, content: 'First Toast', type: 'info' },
        { id: 2, content: 'Second Toast', type: 'success' }
      ]
    };

    render(
      <ToastContext.Provider value={reverseOrderContextValue}>
        <Toaster />
      </ToastContext.Provider>
    );

    const toasts = screen.getAllByRole('toast');
    expect(toasts[0]).toHaveTextContent('First Toast');
    expect(toasts[1]).toHaveTextContent('Second Toast');
  });
});
