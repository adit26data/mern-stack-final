import './App.css';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router, Route } from "react-router-dom"
import WebFont from 'webfontloader';
import React, { useState } from 'react';
import axios from "axios"
import Footer from './component/layout/Footer/Footer.js'
import Home from "./component/Home/Home.js"
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from "./component/Cart/Payment"
function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = React.useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif"]
      }
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/process/payment" component={Payment} />

      <Footer />
    </Router>


  )

}

export default App;
