import React, { useEffect, useState } from 'react';
import { defaultTheme } from '../../theme/defaultTheme';
import Toaster from '../Toaster';
import useTheme from '../../hooks/useTheme';
import { Toast, ToastContextProps } from '../../types/Toast';
import { Theme } from '../../types/Theme';

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
  buttonClasses?: Theme['button']['classes'];
  containerClasses?: Theme['container']['classes'];
  iconClasses?: Theme['icon']['classes'];
  layoutClasses?: Theme['layout']['classes'];
  messageClasses?: Theme['message']['classes'];
  persist?: boolean;
  timeout?: number;
}

const ToastProvider = ({
  children,
  maxToasts = 3,
  persist = false,
  buttonClasses,
  containerClasses,
  iconClasses,
  layoutClasses,
  messageClasses,
  timeout = 3000,
}: ProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);
  const { currentTheme } = useTheme({
    buttonClasses,
    containerClasses,
    iconClasses,
    layoutClasses,
    messageClasses,
  });

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
