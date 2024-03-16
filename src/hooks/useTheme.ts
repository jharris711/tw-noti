import { useState, useEffect } from 'react';
import { defaultTheme } from '../theme/defaultTheme';
import { Theme } from '../types/Theme';
import { ClassValue, clsx } from 'clsx'; // Added import statement
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  buttonClasses?: Theme['button']['classes'];
  containerClasses?: Theme['container']['classes'];
  iconClasses?: Theme['icon']['classes'];
  layoutClasses?: Theme['layout']['classes'];
  messageClasses?: Theme['message']['classes'];
}

const useTheme = ({
  buttonClasses,
  containerClasses,
  iconClasses,
  layoutClasses,
  messageClasses
}: Props) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    setCurrentTheme(() => {
      const temp = currentTheme;

      if (buttonClasses)
        temp.button.classes = cn(temp.button.classes, buttonClasses);

      if (containerClasses) {
        temp.container.classes = cn(temp.container.classes, containerClasses);
        const values = containerClasses
          .split(' ')
          .map((value) => value.split('-')[0] || '');
        temp.container.classes = filterClasses(values, temp.container.classes);
      }

      if (iconClasses) {
        temp.icon.classes = Object.keys(iconClasses || {}).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...acc[key],
              altText: iconClasses[key].altText,
              classes: cn(acc[key].classes, iconClasses[key].classes)
            }
          }),
          temp.icon.classes
        );
      }

      if (layoutClasses)
        temp.layout.classes = cn(temp.layout.classes, layoutClasses);

      if (messageClasses)
        temp.message.classes = cn(temp.message.classes, messageClasses);
      return temp;
    });
  }, [
    buttonClasses,
    containerClasses,
    iconClasses,
    layoutClasses,
    messageClasses,
    currentTheme
  ]);

  return { currentTheme, setCurrentTheme };
};

function filterClasses(values: string[], classString: string): string {
  // Map each direction to its opposite
  const opposites: Record<string, string> = {
    right: 'left',
    left: 'right',
    top: 'bottom',
    bottom: 'top'
  };

  // Iterate over the opposites map
  Object.entries(opposites).forEach(([key, value]) => {
    if (values.includes(key)) {
      // Create a dynamic regex based on the current key's opposite
      const regex = new RegExp(`${value}-\\w+\\s*`, 'g');
      // Replace occurrences of the opposite direction in the class string
      classString = classString.replace(regex, '');
    }
  });

  return classString.trim();
}

export default useTheme;
