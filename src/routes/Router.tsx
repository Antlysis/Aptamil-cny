import React from 'react';
import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// import ReactHelmet from '../components/ReactHelmet';
import Home from '../pages/Home';
import Join from '../pages/Join';
import Login from '../pages/Login';
import MinigameResult from '../pages/Minigame/index';
import MiniGame from '../pages/Minigame/minigame';
import PlayAndRedeem from '../pages/PlayAndRedeem';
import Register from '../pages/Register';
import Upload from '../pages/Upload';
import Verify from '../pages/Verify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getIsAuthenticated, userLogin } from '../store/userSlice';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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
    <BrowserRouter basename="/contest">
      {/* <ReactHelmet /> */}
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/verify'} element={<Verify />} />
          <Route path={'/register'} element={<Register />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path={'/join'} element={<Join />} />
          <Route path={'/home'} element={<Home />} />
          <Route path={'/upload'} element={<Upload />} />
          <Route path={'/playandredeem'} element={<PlayAndRedeem />} />
          <Route path={'/minigame'} element={<MiniGame />} />
          <Route path={'/minigame/result'} element={<MinigameResult />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
