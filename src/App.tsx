import ToastProvider from './components/ToastContext';
import TestTheToast from './components/TestTheToast';

const App = () => {
  return (
    <>
      <ToastProvider persist={false} positionX='right-16' positionY='top-12'>
        <TestTheToast />
      </ToastProvider>
    </>
  );
};

export default App;
