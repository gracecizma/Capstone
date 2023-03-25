import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Products from "./components/Products/AllProducts"
import SingleProduct from "./components/Products/SingleProduct";
import SplashPage from "./components/SplashPage/SplashPage"
import Profile from "./components/UserProfile"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector(state => state?.session?.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path={`/users/profile/${user.id}`}>
            <Profile />
          </Route>
          <Route path="/products/:id">
            <SingleProduct />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
