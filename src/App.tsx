import ToastProvider from './components/ToastContext';
import TestTheToast from './components/TestTheToast';

const App = () => {
  return (
    <>
      <h1 className='text-3xl text-white'>Toast Library</h1>
      <ToastProvider persist={false}>
        <TestTheToast />
      </ToastProvider>
    </>
  );
};

export default App;
