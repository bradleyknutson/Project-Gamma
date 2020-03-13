import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import FormPage from "./views/FormPage";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import StartLocation from "./views/StartLocation";
import UpdateView from "./views/UpdateView";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/create" exact component={FormPage}/>
          <PrivateRoute path="/home" component={StartLocation} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
