import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/not-found/NotFound';
import PinForm from './components/dashboard/PinForm';
import Pin from './components/pin/Pin';
import Gallery from './components/IdeasGallery/Gallery';
import ImageGallery from './components/ImageGallery/ImageGallery'


import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="ml-0 mt-2">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Switch>
                <PrivateRoute exact path="/dashboard/:profile_id" component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/explore" component={ Explore } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-pin" component={ PinForm } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/pin/:id" component={ Pin } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/idea-gallery" component={ Gallery } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/image-gallery/:pin_id" component={ ImageGallery } />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
