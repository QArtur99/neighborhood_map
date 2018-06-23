import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapView from './MapView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapView/>
      </div>
    );
  }
}

export default App;
