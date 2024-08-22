import React from 'react';
import { Route, Navigate} from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ element: Element, ...rest }) => {

    useAuth();
    console.log("1");
    
    const token = localStorage.getItem('token');
    return (
      <Route
        {...rest}
        element={token ? <Element /> : <Navigate to="/login" />}
      />
    );
  };
  

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//           return <Component {...props} />;
//         } else {
//           return <Navigate to="/login" />;
//         }
//       }}
//     />
//   );
// };

export default ProtectedRoute;