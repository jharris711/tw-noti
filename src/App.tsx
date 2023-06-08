import ToastProvider from './components/ToastContext';
import TestTheToast from './components/TestTheToast';

const App = () => {
  return (
    <>
      <ToastProvider
        containerClasses='right-12 bottom-12'
        messageClasses='dark:text-white font-extrabold'
      >
        <TestTheToast />
      </ToastProvider>
    </>
  );
};

export default App;
