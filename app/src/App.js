import React, { Component } from 'react';
import { routes } from './routes/'
import { Route } from 'react-router-dom'
import './static/styles/normalize.scss'
import './static/styles/general.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    );
  }
}

export default App;
