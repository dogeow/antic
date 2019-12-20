import React from 'react'
import { Route, Switch } from "react-router-dom"

// Pages
import SignUp from '../containers/SignUp'
import Index from '../containers/Index'
import About from '../containers/About'

// Layouts
import Header from '../containers/Header'
import Footer from '../containers/Footer'

import NoMatch from '../containers/NoMatch'

const Spa = () => (
  <>
    <Header/>
    <Switch>
      <Route exact path="/" component={Index}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/about" component={About}/>
      <Route component={NoMatch}/>
    </Switch>
    <Footer/>
  </>
);

export default Spa;
