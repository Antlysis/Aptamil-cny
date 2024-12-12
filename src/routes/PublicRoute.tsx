import { Navigate, Outlet } from 'react-router-dom';

interface RouterProps {
  isAuthenticated: boolean;
}

const PublicRoute = ({ isAuthenticated }: RouterProps) => {
  return isAuthenticated ? <Navigate to="/join" /> : <Outlet />;
};

export default PublicRoute;
