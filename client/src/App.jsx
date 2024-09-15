import { Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './commonComponents/Navbar';
import Footer from './commonComponents/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as Actions from '../src/store/actions/index';

function App() {

  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
