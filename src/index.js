/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from "./stores/stores";
import { Provider } from "react-redux";

import AdminLayout from "layouts/Admin.js";
import TutorLayout from "layouts/Tutor";
import TuteeLayout from "layouts/Tutee";

import AuthLayout from "layouts/Auth.js";
import Landing from "views/landing/Landing";
import Select from "views/landing/Select";
import Login from "views/landing/Login";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import Register from "views/landing/Register";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/tutor" render={(props) => <TutorLayout {...props} />} />
        <Route path="/tutee" render={(props) => <TuteeLayout {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />

        <Route path="/" exact render={(props) => <Landing {...props} />} />
        <Route path="/select" exact render={(props) => <Select {...props} />} />
        <Route path="/login" exact render={(props) => <Login {...props} />} />
        <Route
          path="/register"
          exact
          render={(props) => <Register {...props} />}
        />

        <Redirect from="/" to="/admin" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
