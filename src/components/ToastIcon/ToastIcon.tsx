import CheckMarkIcon from '@/svgIcons/CheckMarkIcon';
import CloseIcon from '@/svgIcons/CloseIcon';
import FireIcon from '@/svgIcons/FireIcon';
import InfoCircleIcon from '@/svgIcons/InfoCircleIcon';
import WarningIcon from '@/svgIcons/WarningIcon';
import { Theme } from '@/types/Theme';

interface Props {
  theme: Theme['icon'];
  type: string;
}

export function ToastIcon({ theme, type }: Props) {
  const error = type === 'error';
  const info = type === 'info';
  const success = type === 'success';
  const warning = type === 'warning';

  const classes = theme.classes[type] ? theme.classes[type].classes : '';

  return (
    <div className={classes} data-testid='toast-icon'>
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
      <span className='sr-only'>
        {theme.classes && theme.classes[type]
          ? theme.classes[type].altText
          : 'Default Icon'}
      </span>
    </div>
  );
}
