import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  );
};

