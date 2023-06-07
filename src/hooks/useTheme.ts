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
    if (!buttonClasses) return;
    const temp = currentTheme;
    temp.button.classes = temp.button.classes + ' ' + buttonClasses;
    setCurrentTheme(temp);
  }, [buttonClasses, currentTheme]);

  useEffect(() => {
    if (!containerClasses) return;
    const temp = currentTheme;
    temp.container.classes = temp.container.classes + ' ' + containerClasses;
    setCurrentTheme(temp);
  }, [containerClasses, currentTheme]);

  useEffect(() => {
    if (!iconClasses) return;
    const temp = currentTheme;
    Object.keys(iconClasses).forEach((key) => {
      temp.icon.classes[key].altText = iconClasses[key].altText;
      temp.icon.classes[key].classes =
        temp.icon.classes[key].classes + ' ' + iconClasses[key].classes;
    });
  }, [iconClasses, currentTheme]);

  useEffect(() => {
    if (!layoutClasses) return;
    const temp = currentTheme;
    temp.layout.classes = temp.layout.classes + ' ' + layoutClasses;
    setCurrentTheme(temp);
  }, [layoutClasses, currentTheme]);

  useEffect(() => {
    if (!messageClasses) return;
    const temp = currentTheme;
    temp.message.classes = temp.message.classes + ' ' + messageClasses;
    setCurrentTheme(temp);
  }, [messageClasses, currentTheme]);

  return { currentTheme, setCurrentTheme };
};

export default useTheme;
