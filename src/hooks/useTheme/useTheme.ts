import { useState, useEffect } from 'react';
import { defaultTheme } from '@/theme/defaultTheme';
import { Theme } from '@/types/Theme';
import { ClassValue, clsx } from 'clsx';
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

export const useTheme = ({
  buttonClasses,
  containerClasses,
  iconClasses,
  layoutClasses,
  messageClasses
}: Props) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const handleUpdateTheme = (prevTheme: Theme) => {
      const updatedTheme = { ...prevTheme };

      if (buttonClasses) {
        updatedTheme.button.classes = cn(
          prevTheme.button.classes,
          buttonClasses
        );
      }

      if (containerClasses) {
        updatedTheme.container.classes = cn(
          prevTheme.container.classes,
          containerClasses
        );

        const values = containerClasses
          .split(' ')
          .map((value) => value.split('-')[0] || '');

        updatedTheme.container.classes = filterClasses(
          values,
          updatedTheme.container.classes
        );
      }

      if (iconClasses) {
        updatedTheme.icon.classes = Object.keys(iconClasses || {}).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...acc[key],
              altText: iconClasses[key].altText,
              classes: cn(acc[key].classes, iconClasses[key].classes)
            }
          }),
          prevTheme.icon.classes
        );
      }

      if (layoutClasses) {
        updatedTheme.layout.classes = cn(
          prevTheme.layout.classes,
          layoutClasses
        );
      }

      if (messageClasses) {
        updatedTheme.message.classes = cn(
          prevTheme.message.classes,
          messageClasses
        );
      }

      return updatedTheme;
    };

    setCurrentTheme(handleUpdateTheme);
  }, [
    buttonClasses,
    containerClasses,
    iconClasses,
    layoutClasses,
    messageClasses
  ]);

  return { currentTheme, setCurrentTheme };
};

export function filterClasses(values: string[], classString: string): string {
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
