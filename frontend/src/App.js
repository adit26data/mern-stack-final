import './App.css';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router, Route } from "react-router-dom"
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer.js'
import Home from "./component/Home/Home.js"
import Loader from './component/layout/Loader/Loader';
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
      <Route exact path="/sad" component={Loader} />

      <Footer />
    </Router>


  )

}

export default App;
