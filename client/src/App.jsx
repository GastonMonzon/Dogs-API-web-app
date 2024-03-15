import './App.css'
import axios from "axios";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import dogsFinalBackground from './assets/dogsFinalBackground.mp4'
import { useEffect } from 'react';
import { setAllDogs, setAllTemperaments } from './redux/actions';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    (async function fetchDogs() {
      try {
        const { data } = await axios(`${import.meta.env.RAILWAY}/dogs`);
        dispatch(setAllDogs(data));
      } catch (error) {
        console.error('Error retrieving dogs:', error);
      }
    })();
  }, [dispatch]);
  useEffect(() => {
    (async function fetchTemperaments() {
      try {
        const { data } = await axios(`${import.meta.env.RAILWAY}/temperaments`);
        dispatch(setAllTemperaments(data));
      } catch (error) {
        console.error('Error retrieving temperaments:', error);
      }
    })();
  }, [dispatch]);

  return (
    <div className='app'>
      <Nav />
      {
      (location.pathname === '/home' || (/^\/detail\/\d+$/).test(location.pathname) || location.pathname === '/createdog') ? (
      <video className="background-video" autoPlay loop muted>
        <source src={dogsFinalBackground} type="video/mp4" />
      </video>
      ) : '' }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/createdog' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}