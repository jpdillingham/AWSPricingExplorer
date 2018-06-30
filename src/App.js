import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import '../node_modules/normalize.css/normalize.css'
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css'
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'

import { Button, Intent, Spinner } from "@blueprintjs/core";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Spinner intent={Intent.PRIMARY} />
        <Button intent={Intent.SUCCESS}>button content</Button>
      </div>
    );
  }
}

export default App;
