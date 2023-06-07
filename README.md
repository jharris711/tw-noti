# tw-noti

# TailwindCSS Toast Notifications and Provider for React Applications

A simple way to set up Toast notifications in your React projects when you are using Tailwind CSS.

# Installation

_Make sure you have TailwindCSS setup in your project_

`npm install tw-noti`

# Usage

- Import the `ToastProvider` and use it to wrap your application:

```javascript
import { ToastProvider } from 'tw-noti';

export default function App() {
  return (
    <>
      <ToastProvider
        maxToasts={3}
        timeout={3000}
        containerClasses='right-12 bottom-12'
      >
        <Child />
      </ToastProvider>
    </>
  );
}
```

- In a child component, import the `useToast` hook and use it to either `enqueue` or `dequeue` your Toast notification:

```javascript
import { useToast } from 'tw-noti';

const Child = () => {
  // Initialize the hook:
  const { enqueueToast } = useToast();

  const handleClick = () => {
    // Pass your message and the type of Toast you would like to display:
    enqueueToast({ content: 'This is a notification', type: 'success' });
  };

  return (
    <div class='container' style={{ width: '80 %', margin: '0 auto' }}>
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        onClick={handleClick}
      >
        Show a toast!
      </button>
    </div>
  );
};

export default Child;
```

# Components

## ToastProvider

The `ToastProvider` houses the `ToastContainer` and the `Toaster`.maxToasts

| Prop               | type                     | default                                                                                                                                                                                                                                       | description                                                                                  |
| ------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `maxToasts`        | number                   | 3                                                                                                                                                                                                                                             | Number of toasts that can be displayed at one time                                           |
| `persist`          | boolean                  | false                                                                                                                                                                                                                                         | If false, toasts will be dismissed after timeout                                             |
| `timeout`          | number                   | 3000                                                                                                                                                                                                                                          | If `persist` set to `false`, amount of time (ms) Toasts wait before automatically dismissing |
| `buttonClasses`    | string                   | 'h-8 w-8 ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex dark:text-gray-500 text-gray-400 dark:hover:text-white hover:text-gray-900 dark:bg-gray-800 bg-white dark:hover:bg-gray-700 hover:bg-gray-100' | Accepts Tailwind classes to override default Toast action button styles                      |
| `containerClasses` | string                   | 'right-16 bottom-16 fixed z-50'                                                                                                                                                                                                               | Accepts Tailwind classes to override default Toast container styles                          |
| `iconClasses`      | Theme['icon']['classes'] | See Theme                                                                                                                                                                                                                                     | Accepts Tailwind classes to override default Toast icon styles                               |
| `layoutClasses`    | string                   | 'animate-fade-down animate-ease-in-out flex items-center w-full max-w-xs p-4 rounded-lg shadow dark:bg-gray-800 bg-white dark:text-gray-400 text-gray-500'                                                                                    | Accepts Tailwind classes to override default Toast layout styles                             |
| `messageClasses`   | string                   | 'ml-3 text-sm font-normal'                                                                                                                                                                                                                    | Accepts Tailwind classes to override default Toast message styles                            |

# Hooks

## useToast

useToast is a React hook that provides access to the ToastContext
and its associated props.

### Usage

```javascript
import { useToast } from './useToast';

const MyComponent = () => {
  const toastContext = useToast();
  // ...
};
```

### Arguments

None.

### Returns

Returns the ToastContextProps associated with the ToastContext.

```javascript
interface ToastContextProps {
  theme: Theme;
  toasts: Toast[];
  enqueueToast: ({ content, type }: { content: string; type: string }) => void;
  dequeueToast: (id: number) => void;
}
```

### Errors

If useToast is used outside of a ToastProvider, an error will be thrown.

# Default Toast Variants

| Type      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `info`    | Blue - Used for general notifications, alerts, and messages                 |
| `success` | Green - Used for success messages                                           |
| `error`   | Red - Used for errors, access denied messages, and other bad stuff          |
| `warning` | Orange - Used for warning messages or things the user must pay attention to |

# Customization

To override any of the default styles, you can apply Tailwind CSS classes to the ToastProvider component via its various props.

## Examples:

- Position the notifications in the bottom-right corner:

```javascript
<ToastProvider containerClasses='right-12 bottom-12'>
  <Child />
</ToastProvider>
```

- Change the layout background color and change the text color:

```javascript
<ToastProvider
  layoutClasses='dark:bg-teal-500'
  messageClasses='dark:text-black'
>
  <Child />
</ToastProvider>
```

- Customize the close button:

```javascript
<ToastProvider buttonClasses='dark:bg-white'>
  <Child />
</ToastProvider>
```

- Edit the icon:

```javascript
<ToastProvider
  iconClasses={{
    info: { altText: 'Green Icon', classes: 'dark:bg-orange-500' },
    error: { altText: 'Teal Icon', classes: 'dark:bg-teal-500' },
  }}
>
  <Child />
</ToastProvider>
```

## Theme

```javascript
interface Theme {
  button: { classes: string };
  container: { classes: string };
  icon: {
    classes: {
      [key: string]: {
        altText: string,
        classes: string,
      },
    },
  };
  layout: { classes: string };
  message: { classes: string };
}
```

## Toaster Component Reference

```javascript
<ToastContainer containerClasses=''>
  {toasts.map((toast) => (
    <ToastLayout layoutClasses=''>
      <ToastIcon iconClasses='' />
      <ToastMessage messageClasses='' />
      <ToastActionBtn buttonClasses='' />
    </ToastLayout>
  ))}
</ToastContainer>
```
