import React from 'react';
import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactHelmet from '../components/ReactHelmet';
import Home from '../pages/Home';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Upload from '../pages/Upload';
import Verify from '../pages/Verify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getIsAuthenticated, userLogin } from '../store/userSlice';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PlayAndRedeem from '../pages/PlayAndRedeem';

const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated =
    useAppSelector(getIsAuthenticated) || Cookies.get('user-token') ? true : false;
  useEffect(() => {
    const auth = Cookies.get('user-token') ? true : false;
    if (auth) {
      dispatch(userLogin());
    }
  }, []);
  return (
    <BrowserRouter>
      <ReactHelmet />
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path={'/contest/login'} element={<Login />} />
          <Route path={'/contest/verify'} element={<Verify />} />
          <Route path={'/contest/register'} element={<Register />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path={'/contest/join'} element={<Join />} />
          <Route path={'/contest/home'} element={<Home />} />
          <Route path={'/contest/upload'} element={<Upload />} />
          <Route path={'/contest/playandredeem'} element={<PlayAndRedeem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
