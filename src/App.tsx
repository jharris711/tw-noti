import ToastProvider from './components/ToastContext';
import TestTheToast from './components/TestTheToast';

const App = () => {
  return (
    <>
      <ToastProvider containerClasses='right-12 bottom-12'>
        <TestTheToast />
      </ToastProvider>
    </>
  );
};

export default App;
