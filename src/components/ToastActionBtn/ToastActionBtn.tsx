import CloseIcon from '../../svgIcons/CloseIcon';
import { ButtonTheme } from '../../types/Theme';

interface Props {
  theme: ButtonTheme;
  type: string;
  onClick?: () => void;
}

const ToastActionBtn = ({ theme, type, onClick }: Props) => {
  const classes = [
    theme.bg.dark,
    theme.bg.light,
    theme.bg.hover.dark,
    theme.bg.hover.light,
    theme.text.dark,
    theme.text.light,
    theme.text.hover.dark,
    theme.text.hover.light,
    theme.h,
    theme.w,
    `ml-auto`,
    `-mx-1.5`,
    `-my-1.5`,
    `rounded-lg`,
    `focus:ring-2`,
    `focus:ring-gray-300`,
    `p-1.5`,
    `inline-flex`,
  ];
  console.log(classes);
  return (
    <button
      type='button'
      className={classes.join(' ')}
      data-dismiss-target={`#toast-${type}`}
      aria-label='Close'
      onClick={onClick}
    >
      <CloseIcon className='w-5 h-5' />
    </button>
  );
};

export default ToastActionBtn;
