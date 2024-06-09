import ToastProvider from '@/components/ToastContext';
import Example from '@/components/Example';

const App = () => {
  return (
    <div data-testid='app-component'>
      <ToastProvider
        containerClasses='right-12 bottom-12 space-y-2'
        messageClasses='dark:text-white font-extrabold'
        reverseStackOrder
      >
        <Example />
      </ToastProvider>
    </div>
  );
};

export default App;
