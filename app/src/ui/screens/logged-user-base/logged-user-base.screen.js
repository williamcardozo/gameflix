import React, { Component } from 'react'
import { GameCard, Image } from '@components'
import './style.scss'

const SidebarHeader = (props) => (
  <header>
    <div className="bottom-content">
      <div className="user">

        <img src="https://i.pinimg.com/originals/76/34/f0/7634f00d8f0e15f697e5cf9fb99a0d47.jpg" />
        <span className="greetings">
          Olá, <span className="name">William!</span>
        </span>

        <div className="quit">
          <button onClick={() => alert('saiu')}> Sair  {Image.ICONS.Exit}</button>
        </div>
      </div>
    </div>
  </header>
)

export class LoggedUserBase extends Component {


  render() {
    return (
      <div className="base-container">
        <div className="sidebar">
          <SidebarHeader {...props} />
        </div>
        <div className="screen-content">
          <GameCard name="Monster Hunter World" image="https://s3.amazonaws.com/comparegame/thumbnails/43130/large.jpg" />
          <GameCard name="Red Dead Redemption 2" image="https://images-na.ssl-images-amazon.com/images/I/91C8piUiI0L._SX342_.jpg" />
          <GameCard name="God of Warr" image="https://images-na.ssl-images-amazon.com/images/I/51po2bu7VnL.jpg" />

          <div>
            {Image.ICONS.Close}
            {Image.ICONS.Gamepad}
            {Image.ICONS.Order}
            {Image.ICONS.Search}
            {Image.ICONS.Videogame}
          </div>
        </div>
      </div>
    )
  }
}