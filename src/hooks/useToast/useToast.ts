import { useContext } from 'react';
import { ToastContext } from '@/components/ToastContext/ToastContext';
import { ToastContextProps } from '@/types/Toast';

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
};
