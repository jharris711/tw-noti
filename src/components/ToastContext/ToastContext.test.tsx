import React, { useContext } from 'react';
import { describe, expect, test, vi } from 'vitest';
import {
  render,
  renderHook,
  screen,
  act,
  fireEvent
} from '@testing-library/react';
import { ToastProvider, ToastContext } from './ToastContext';
import { defaultTheme } from '@/theme/defaultTheme';
import { v4 as uuidv4 } from 'uuid';
import useTheme from '@/hooks/useTheme';
import { useToast } from '@/lib';

vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('unique-id')
}));

describe('ToastProvider', () => {
  const TestComponent = () => {
    const { enqueueToast, toasts } = useContext(ToastContext);

    return (
      <div>
        <button
          onClick={() => enqueueToast({ content: 'Test Toast', type: 'info' })}
        >
          Add Toast
        </button>
        <div data-testid='toasts-count'>{toasts.length}</div>
      </div>
    );
  };

  test('should render children correctly', () => {
    render(
      <ToastProvider>
        <div>Test Child</div>
      </ToastProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('should add a toast and increase toasts length', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const addButton = screen.getByText('Add Toast');
    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId('toasts-count').textContent).toBe('1');
  });

  test('should remove a toast after timeout', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider timeout={1000}>
        <TestComponent />
      </ToastProvider>
    );

    const addButton = screen.getByText('Add Toast');
    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId('toasts-count').textContent).toBe('1');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId('toasts-count').textContent).toBe('0');
  });

  test('should handle maxToasts limit and queue the rest', () => {
    render(
      <ToastProvider maxToasts={2}>
        <TestComponent />
      </ToastProvider>
    );

    const addButton = screen.getByText('Add Toast');
    act(() => {
      addButton.click();
      addButton.click();
      addButton.click();
    });

    expect(screen.getByTestId('toasts-count').textContent).toBe('3');
  });

  test('should apply the correct theme', () => {
    const TestThemeComponent = () => {
      const { theme } = useContext(ToastContext);
      return <div data-testid='theme-value'>{JSON.stringify(theme)}</div>;
    };

    render(
      <ToastProvider>
        <TestThemeComponent />
      </ToastProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(
      JSON.stringify(defaultTheme)
    );
  });

  test('should use custom domRoot if provided', () => {
    const domRoot = document.createElement('div');
    document.body.appendChild(domRoot);

    render(
      <ToastProvider domRoot={domRoot}>
        <div>Test Child</div>
      </ToastProvider>
    );

    expect(domRoot.querySelector('.toaster')).toBeInTheDocument();
  });

  test('should handle enqueueing and dequeueing correctly', () => {
    const TestEnqueueDequeueComponent = () => {
      const { enqueueToast, dequeueToast, toasts } = useContext(ToastContext);
      return (
        <div>
          <button
            onClick={() =>
              enqueueToast({ content: 'Test Toast', type: 'info' })
            }
          >
            Add Toast
          </button>
          <button onClick={() => dequeueToast(toasts[0]?.id)}>
            Remove Toast
          </button>
          <div data-testid='toasts-count'>{toasts.length}</div>
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestEnqueueDequeueComponent />
      </ToastProvider>
    );

    const addButton = screen.getByText('Add Toast');
    const removeButton = screen.getByText('Remove Toast');

    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId('toasts-count').textContent).toBe('1');

    act(() => {
      removeButton.click();
    });

    expect(screen.getByTestId('toasts-count').textContent).toBe('0');
  });
});
