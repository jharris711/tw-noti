import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToast } from './useToast';
import { ToastProvider } from '@/components/ToastContext/ToastContext';
import { ToastContextProps } from '@/types/Toast';

describe('useToast hook', () => {
  test('should return context value when used within ToastProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining<ToastContextProps>({
        reverseStackOrder: expect.any(Boolean),
        theme: expect.any(Object),
        toasts: expect.any(Array),
        enqueueToast: expect.any(Function),
        dequeueToast: expect.any(Function)
      })
    );
  });

  test('should throw error when used outside of ToastProvider', () => {
    try {
      renderHook(() => useToast());
    } catch (error) {
      expect(error).toEqual(
        Error('useToastContext must be used within a ToastProvider')
      );
    }
  });
});
