import React from 'react';
import { Navigate  } from 'react-router-dom';

function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("vendorToken") ? flag=true : flag=false
    return flag
}

const RouteGuard = (props) => {
   return (
        <>
        {hasJWT() ?
            <props.Component {...props} />
        :
            <Navigate to='/login' />
        }
        </>
   );
};
 
export default RouteGuard;