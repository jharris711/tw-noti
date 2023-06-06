import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import { defaultTheme } from '../../theme/defaultTheme';
import ToastContainer from '../ToastContainer';

const Toaster = () => {
  const { toasts, dequeueToast } = useToast();

  const handleToastClose = (id: number) => {
    dequeueToast(id);
  };

  return (
    <ToastContainer theme={defaultTheme.container}>
      {toasts.map((toast) => (
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
