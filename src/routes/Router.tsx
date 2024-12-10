import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactHelmet from '../components/ReactHelmet';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import Home from '../pages/Home';
import Upload from '../pages/Upload';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ReactHelmet />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/verify'} element={<Verify />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/join'} element={<Join />} />
        <Route path={'/home'} element={<Home />} />
        <Route path={'/upload'} element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
