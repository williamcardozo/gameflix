import React, { Component } from 'react';
import { LoginScreen } from '@screens'
import './static/styles/normalize.scss'
import './static/styles/general.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginScreen />
      </div>
    );
  }
}

export default App;
