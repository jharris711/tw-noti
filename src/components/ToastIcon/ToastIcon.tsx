import CheckMarkIcon from '../../svgIcons/CheckMarkIcon';
import CloseIcon from '../../svgIcons/CloseIcon';
import FireIcon from '../../svgIcons/FireIcon';
import InfoCircleIcon from '../../svgIcons/InfoCircleIcon';
import WarningIcon from '../../svgIcons/WarningIcon';

interface Props {
  theme: Record<string, any>;
  type: string;
}

const ToastIcon = ({ theme, type }: Props) => {
  const error = type === 'error';
  const info = type === 'info';
  const success = type === 'success';
  const warning = type === 'warning';

  const classes = [
    `inline-flex`,
    `items-center`,
    `justify-center`,
    `flex-shrink-0`,
    `rounded-lg`,
    `${theme.w}`,
    `${theme.h}`,
    `${theme[type].bg.dark}`,
    `${theme[type].bg.light}`,
    `${theme[type].text.dark}`,
    `${theme[type].text.light}`,
  ];

  return (
    <div className={classes.join(' ')}>
      {error ? (
        <CloseIcon className='w-5 h-5' />
      ) : info ? (
        <InfoCircleIcon className='w-5 h-5' />
      ) : success ? (
        <CheckMarkIcon className='w-5 h-5' />
      ) : warning ? (
        <WarningIcon className='w-5 h-5' />
      ) : (
        <FireIcon className='w-5 h-5' />
      )}
      <span className='sr-only'>{theme[type].altText}</span>
    </div>
  );
};

export default ToastIcon;
