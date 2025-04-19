
import { Navigate } from 'react-router-dom';

// Redirect to our HomePage
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
