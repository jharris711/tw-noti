import CloseIcon from '../../svgIcons/CloseIcon';
import { Theme } from '../../types/Theme';

interface Props {
  theme: Theme['button'];
  type: string;
  onClick?: () => void;
}

const ToastActionBtn = ({ theme, type, onClick }: Props) => {
  return (
    <button
      type='button'
      className={theme.classes}
      data-dismiss-target={`#toast-${type}`}
      aria-label='Close'
      onClick={onClick}
    >
      <CloseIcon className='w-5 h-5' />
    </button>
  );
};

export default ToastActionBtn;
