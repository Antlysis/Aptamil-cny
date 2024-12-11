import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { getUserDetailsAPI } from '../services/authService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserDetails, setUserDetails } from '../store/userSlice';

interface RouterProps {
  isAuthenticated: boolean;
}

const PrivateRoute = ({ isAuthenticated }: RouterProps) => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(getUserDetails);
  useEffect(() => {
    if (isAuthenticated && !userDetails) {
      (async () => {
        const res = await getUserDetailsAPI();
        console.log('get user details');
        if (res) {
          dispatch(setUserDetails(res?.data));
        }
      })();
    }
  }, []);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
