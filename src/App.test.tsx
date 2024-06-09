import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

// Mock the useToast hook
const mockEnqueueToast = vi.fn();
const mockDequeueToast = vi.fn();
vi.mock('@/hooks/useToast/useToast', () => ({
  useToast: () => ({
    toasts: [],
    enqueueToast: mockEnqueueToast,
    dequeueToast: mockDequeueToast,
    reverseStackOrder: false,
    theme: {}
  })
}));

describe('App component', () => {
  test('should render the component', () => {
    render(<App />);

    const component = screen.getByTestId('app-component');
    expect(component).toBeInTheDocument();
  });

  test('should render the button', () => {
    render(<App />);

    const button = screen.getByTestId('example-component-toast-trigger-button');
    expect(button).toBeInTheDocument();
  });

  test('should call enqueueToast on button click', () => {
    render(<App />);

    const button = screen.getByTestId('example-component-toast-trigger-button');
    fireEvent.click(button);

    expect(mockEnqueueToast).toHaveBeenCalledWith({
      content: 'This is a notification',
      type: 'info'
    });
  });
});
