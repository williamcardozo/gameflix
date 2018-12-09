import React, { Component } from 'react';
import { LoggedUserBase } from '@screens'
import './static/styles/normalize.scss'
import './static/styles/general.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoggedUserBase />
      </div>
    );
  }
}

export default App;
