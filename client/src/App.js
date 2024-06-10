/* eslint-disable no-unused-vars */
import './App.css';
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Login} />
            <Route exact path='/register' Component={SignUp} />
            <Route path='/login' Component={Login} />
            <Route path='/home' Component={Home}/>
            <Route path='*' Component={NotFound} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
