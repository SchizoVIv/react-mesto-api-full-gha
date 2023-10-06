import React from "react";
import {  Navigate } from "react-router-dom"

const ProtectedRoute = ({ element: Component, ...props }) => {
  return(
    props.isloggingIn ? <Component {...props} /> : <Navigate to="/sign-in" />
  )
}

export default ProtectedRoute
