# tw-noti

## TailwindCSS Toast Notifications and Provider for React Applications

A simple way to set up Toast notifications in your React projects when you are using Tailwind CSS.

## Installation

_Make sure you have TailwindCSS setup in your project_

`npm install tw-noti`

## Usage

- Import the `ToastProvider` and use it to wrap your application:

```javascript
import { ToastProvider } from 'tw-noti';

export default function App() {
  return (
    <>
      <ToastProvider maxToasts={3} timeout={3000}>
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

## Components

### ToastProvider

The `ToastProvider` houses the `ToastContainer` and the `Toaster`.maxToasts

| Prop        | type   | default | description                                                     |
| ----------- | ------ | ------- | --------------------------------------------------------------- |
| `maxToasts` | number | 3       | Number of toasts that can be displayed at one time              |
| `timeout`   | number | 3000    | Amount of time (ms) Toasts wait before automatically dismissing |

## Hooks

### useToast

useToast is a React hook that provides access to the ToastContext
and its associated props.

#### Usage

```javascript
import { useToast } from './useToast';

const MyComponent = () => {
  const toastContext = useToast();
  // ...
};
```

#### Arguments

None.

#### Returns

Returns the ToastContextProps associated with the ToastContext.

```javascript
interface ToastContextProps {
  theme: Theme;
  toasts: Toast[];
  enqueueToast: ({ content, type }: { content: string; type: string }) => void;
  dequeueToast: (id: number) => void;
}
```

#### Errors

If useToast is used outside of a ToastProvider, an error will be thrown.

## Default Toast Variants

| Type      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `info`    | Blue - Used for general notifications, alerts, and messages                 |
| `success` | Green - Used for success messages                                           |
| `error`   | Red - Used for errors, access denied messages, and other bad stuff          |
| `warning` | Orange - Used for warning messages or things the user must pay attention to |
