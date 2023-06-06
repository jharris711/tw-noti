export interface Theme {
  button: ButtonTheme;
  container: ContainerTheme;
  icon: IconTheme;
  layout: LayoutTheme;
  message: MessageTheme;
}

export interface ButtonTheme {
  h: string;
  w: string;
  text: {
    dark: string;
    light: string;
    hover: {
      dark: string;
      light: string;
    };
  };
  bg: {
    dark: string;
    light: string;
    hover: {
      dark: string;
      light: string;
    };
  };
}

export interface ContainerTheme {
  x: string;
  y: string;
  position: string;
  zIndex: string;
}

export interface IconThemeType {
  altText: string;
  text: {
    dark: string;
    light: string;
  };
  bg: {
    dark: string;
    light: string;
  };
}

export interface IconTheme {
  h: string;
  w: string;
  error: IconThemeType;
  info: IconThemeType;
  success: IconThemeType;
  warning: IconThemeType;
}

export interface LayoutTheme {
  shadow: string;
  bg: {
    dark: string;
    light: string;
  };
  text: {
    dark: string;
    light: string;
  };
}

export interface MessageTheme {
  textSize: string;
  fontStyle: string;
}
