import './App.css';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router, Route } from "react-router-dom"
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer.js'
import Home from "./component/Home/Home.js"
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignup from './component/User/LoginSignup';
function App() {
  React.useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignup} />

      <Footer />
    </Router>


  )

}

export default App;
