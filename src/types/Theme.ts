export interface Theme {
  button: { classes: string };
  container: { classes: string };
  icon: {
    classes: {
      [key: string]: {
        altText: string;
        classes: string;
      };
    };
  };
  layout: { classes: string };
  message: { classes: string };
}
