import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Products from "./components/Products/AllProducts"
import SingleProduct from "./components/Products/SingleProduct";
import SplashPage from "./components/SplashPage/SplashPage"
import Profile from "./components/UserProfile"
import UserReviews from "./components/UserProfile/UserReviews";
import CreateProduct from "./components/Products/CreateProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
import ShoppingCart from "./components/ShoppingCart";
import Breads from "./components/Products/Categories/Breads";
import Cookies from "./components/Products/Categories/Cookies";
import Cake from "./components/Products/Categories/Cakes";
import Sweets from "./components/Products/Categories/Sweets";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

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
          <Route path="/users/profile/:id/reviews">
            <UserReviews />
          </Route>
          <Route path="/users/profile/:id/orders">
            <h1>Order history coming soon!</h1>
          </Route>
          <Route path="/users/profile/:id">
            <Profile />
          </Route>
          <Route path="/products/breads">
            <Breads />
          </Route>
          <Route path="/products/cakes">
            <Cake />
          </Route>
          <Route path="/products/cookies">
            <Cookies />
          </Route>
          <Route path="/products/sweets">
            <Sweets />
          </Route>
          <Route path="/products/new">
            <CreateProduct />
          </Route>
          <Route path="/products/:id/edit">
            <UpdateProduct />
          </Route>
          <Route path="/products/:id">
            <SingleProduct />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/shopping-cart">
            <ShoppingCart />
          </Route>
          <Route path="/search">
            <h1>Search feature coming soon!</h1>
          </Route>
          <Route path="/faqs">
            <h1>FAQ page coming soon</h1>
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
