import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginAdmin from "./components/LoginAdmin";
import Home from "./components/Home";
import Navbar from './components/Navbar'
import Userm from './components/Userman'
import Stock from './components/Stock'
function App() {
  return (
    <BrowserRouter>
    <div>
    {/* <Navbar /> */}
      <Switch>
        <Route path="/usermanage" component={Userm} />
        <Route path="/stock" component={Stock} />
        <Route path="/login" component={LoginAdmin} />
        <Route exact path="/" component={LoginAdmin} />
        <Route path="*">Page not found</Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
