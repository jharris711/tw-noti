import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import { defaultTheme } from '../../theme/defaultTheme';
import ToastContainer from '../ToastContainer';

const Toaster = () => {
  const { toasts, dequeueToast } = useToast();

  const handleToastClose = (id: number) => {
    dequeueToast(id);
  };

  // Sort the toasts array in descending order based on created-at time (toast.id)
  const sortedToasts = toasts.sort((a, b) => b.id - a.id);

  return (
    <ToastContainer theme={defaultTheme.container}>
      {sortedToasts.map((toast) => (
        <Toast
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
