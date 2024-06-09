import ToastProvider from './components/ToastContext';
import Example from './components/Example';

const App = () => {
  return (
    <>
      <ToastProvider
        containerClasses='right-12 top-12 space-y-2'
        messageClasses='dark:text-white font-extrabold'
        reverseStackOrder
      >
        <Example />
      </ToastProvider>
    </>
  );
};

export default App;
