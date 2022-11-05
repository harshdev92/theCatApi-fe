import React from 'react';
import './App.css';
import Cats from './components/Cats';
import UploadCatImage from './components/UploadCatImage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="App">
      <UploadCatImage />
      <Cats />
      </div>
    </>
    
  );  
}

export default App;
