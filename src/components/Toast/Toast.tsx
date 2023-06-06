import ToastActionBtn from '../ToastActionBtn';
import ToastIcon from '../ToastIcon';
import ToastLayout from '../ToastLayout';
import ToastMessage from '../ToastMessage';
import { useToast } from '../../hooks/useToast';

interface ToastProps {
  content: string;
  type: string;
  onClose?: () => void;
}

const Toast = ({ content, type, onClose }: ToastProps) => {
  const { theme } = useToast();
  return (
    <ToastLayout theme={theme.layout} type={type}>
      <ToastIcon theme={theme.icon} type={type} />
      <ToastMessage theme={theme.message}>{content}</ToastMessage>
      <ToastActionBtn theme={theme.button} type={type} onClick={onClose} />
    </ToastLayout>
  );
};

export default Toast;
