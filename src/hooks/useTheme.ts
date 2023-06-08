import { useState, useEffect } from 'react';
import { defaultTheme } from '../theme/defaultTheme';
import { Theme } from '../types/Theme';

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
  messageClasses,
}: Props) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (
      !buttonClasses &&
      !containerClasses &&
      !iconClasses &&
      !layoutClasses &&
      !messageClasses
    )
      return;
    const temp = currentTheme;
    if (buttonClasses)
      temp.button.classes = temp.button.classes + ' ' + buttonClasses;
    if (containerClasses)
      temp.container.classes = temp.container.classes + ' ' + containerClasses;
    if (iconClasses) {
      Object.keys(iconClasses).forEach((key) => {
        temp.icon.classes[key].altText = iconClasses[key].altText;
        temp.icon.classes[key].classes =
          temp.icon.classes[key].classes + ' ' + iconClasses[key].classes;
      });
    }
    if (layoutClasses)
      temp.layout.classes = temp.layout.classes + ' ' + layoutClasses;
    if (messageClasses)
      temp.message.classes = temp.message.classes + ' ' + messageClasses;
    setCurrentTheme(temp);
  }, [
    buttonClasses,
    containerClasses,
    iconClasses,
    layoutClasses,
    messageClasses,
    currentTheme,
  ]);

  return { currentTheme, setCurrentTheme };
};

export default useTheme;
