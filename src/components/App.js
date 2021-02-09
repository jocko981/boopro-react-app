import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import HomePage from "../components/HomePage";

const App = () => {

    return (
        <div>
        <BrowserRouter>
          <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/" exact component={LoginForm} />
          </Switch>
                       
        </BrowserRouter>
        
        </div>
    );
}

export default App;