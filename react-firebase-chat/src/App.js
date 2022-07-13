import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  });
  // if (loading) {
  //   return (
  //     <Loading/>
  //   )
  // }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route  path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
