import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/not-found/NotFound';
import CategoryFeed from './components/forum/CategoryFeed';
import Post from './components/posts/Post';

import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
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
            <Route exact path="/" component={ CategoryFeed } />
            <div className="ml-0 mt-2">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/not-found" component={NotFound} />
              <Route exact path="/post/:post_id" component={ Post } />
              <Route exact path="/:category" component={ CategoryFeed } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
