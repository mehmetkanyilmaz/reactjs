import { Route } from 'react-router-dom'

function ProtectedRoute({ component, ...rest }) {
  return <Route component={component} />;
}

export default ProtectedRoute