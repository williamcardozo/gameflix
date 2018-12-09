import React, { Component } from 'react';
import { GameCard, UserImage } from '@components'
import './App.scss';
import './static/styles/normalize.scss'
import './static/styles/general.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameCard name="Monster Hunter World" image="https://s3.amazonaws.com/comparegame/thumbnails/43130/large.jpg"/>
        <GameCard name="Red Dead Redemption 2" image="https://images-na.ssl-images-amazon.com/images/I/91C8piUiI0L._SX342_.jpg"/>
        <GameCard name="God of Warr" image="https://images-na.ssl-images-amazon.com/images/I/51po2bu7VnL.jpg"/>
        <UserImage image="https://i.pinimg.com/originals/76/34/f0/7634f00d8f0e15f697e5cf9fb99a0d47.jpg"/>
      </div>
    );
  }
}

export default App;
