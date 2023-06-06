import React, { useEffect, useState } from 'react';
import { defaultTheme } from '../../theme/defaultTheme';
import Toaster from '../Toaster';
import { Toast, ToastContextProps } from '../../types/Toast';
import { Theme } from '../../types/Theme';
import useXY from '../../hooks/useXY';

export const ToastContext = React.createContext<ToastContextProps>({
  theme: defaultTheme,
  toasts: [],
  enqueueToast: () => {
    console.log('');
  },
  dequeueToast: () => {
    console.log('');
  },
});

interface ProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  positionX?: string;
  positionY?: string;
  persist?: boolean;
  timeout?: number;
}

const ToastProvider = ({
  children,
  maxToasts = 3,
  persist = false,
  positionX,
  positionY,
  timeout = 3000,
}: ProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  useXY({ x: positionX, y: positionY, theme: currentTheme, setCurrentTheme });

  useEffect(() => {
    if (queue.length > 0 && toasts.length < maxToasts) {
      const [nextToast, ...remainingQueue] = queue;
      setToasts((prevToasts) => [...prevToasts, nextToast]);
      setQueue(remainingQueue);

      if (timeout && !persist) {
        setTimeout(() => {
          dequeueToast(nextToast.id);
        }, timeout);
      }
    }

    console.log('toasts', toasts);
    console.log('queue', queue);
  }, [queue, toasts, maxToasts, persist, timeout]);

  const enqueueToast = ({
    content,
    type,
  }: {
    content: string;
    type: string;
  }) => {
    const newToast: Toast = {
      id: Date.now(),
      content,
      type,
    };

    if (toasts.length >= maxToasts) {
      setQueue((prevQueue) => [...prevQueue, newToast]);
    } else {
      setToasts((prevToasts) => [...prevToasts, newToast]);

      if (timeout && !persist) {
        setTimeout(() => {
          dequeueToast(newToast.id);
        }, timeout);
      }
    }
  };

  const dequeueToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toastContextValue: ToastContextProps = {
    theme: currentTheme,
    toasts,
    enqueueToast,
    dequeueToast,
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
