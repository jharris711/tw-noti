import { useMemo } from 'react';
import ToastComponent from '../../components/Toast';
import { Toast } from '../../types/Toast';
import { useToast } from '../../hooks/useToast';
import { defaultTheme } from '../../theme/defaultTheme';
import ToastContainer from '../ToastContainer';

// Sort the toasts array in descending order based on created-at time (toast.id)
const sortToasts = (toasts: Toast[]) => {
  const sorted = toasts;
  return sorted.sort((a, b) => b.id - a.id);
};

const Toaster = () => {
  const { toasts, dequeueToast, reverseStackOrder } = useToast();
  const sortedToasts = useMemo(() => {
    if (reverseStackOrder) {
      return toasts;
    }
    return sortToasts(toasts);
  }, [toasts, reverseStackOrder]);

  const handleToastClose = (id: number) => {
    dequeueToast(id);
  };

  return (
    <ToastContainer theme={defaultTheme.container}>
      {sortedToasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          content={toast.content}
          type={toast.type}
          onClose={() => handleToastClose(toast.id)}
        />
      ))}
    </ToastContainer>
  );
};

export default Toaster;
