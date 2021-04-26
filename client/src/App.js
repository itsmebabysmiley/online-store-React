import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginAdmin from "./components/LoginAdmin";
import Home from "./components/Home";
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import Userm from './components/Userman'
import Stock from './components/Stock'
function App() {
  return (
    <BrowserRouter>
    <div>
    <Navbar />
      <Switch>
        <Route path="/usermanage" component={Userm} />
        <Route path="/stock" component={Stock} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={LoginAdmin} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
