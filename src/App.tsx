import ToastProvider from './components/ToastContext';
import TestTheToast from './components/TestTheToast';

const App = () => {
  return (
    <>
      <ToastProvider
        containerClasses='right-12 top-10'
        messageClasses='dark:text-white font-extrabold'
        reverseStackOrder
      >
        <TestTheToast />
      </ToastProvider>
    </>
  );
};

export default App;
