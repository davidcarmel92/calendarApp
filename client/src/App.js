import React, { Component } from 'react';
import Container from './components/Container';
import './App.css';
import Root from './Root';

class App extends Component {

  render(){

    return (
      <Root>
        <Container />
      </Root>
    );
  }
}

export default App;
