import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginAdmin from "./components/LoginAdmin";
import Home from "./components/Home";
import Userm from './components/Userman'
import Stock from './components/Stock'
import Logout from "./components/Logout";
import Stockresults from "./components/Stockresults";
import Userresults from "./components/Userresults";
function App() {
  return (
    <BrowserRouter>
    <div>
    {/* <Navbar /> */}
      <Switch>
        <Route path="/usermanage" component={Userm} />
        <Route path="/stock" component={Stock} />
        <Route path="/productresults" component={Stockresults} />
        <Route path="/userresults" component={Userresults} />
        <Route path="/login" component={LoginAdmin} />
        <Route path="/logout" component={Logout}/>
        <Route path="/home" component={Home} />
        <Route exact path="/" component={LoginAdmin} />
        <Route path="*">Page not found</Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
