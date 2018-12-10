import React, { Component } from 'react'
import { Image } from '@components'
import { routes } from './routes'
import { Link, Route } from 'react-router-dom'
import './style.scss'
import { GamesScreen } from '../games/games.screen';

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

const MenuItem = ({icon, label, page}) => (
  <Link to={page}>
    <span className="item">
      <span className="icon">
        {icon}
      </span>
      <span>{label}</span>
    </span>
    {Image.ICONS.ArrowRight}
  </Link>
)

export class LoggedUserBase extends Component {

  render() {
    return (
      <div className="base-container">
        <div className="sidebar">
          
          <SidebarHeader {...this.props} />
          <div className="menu">
            <MenuItem icon={Image.ICONS.Videogame} label="Games" page="/games"/>
            <MenuItem icon={Image.ICONS.Order} label="Pedidos" page="/orders" />
          </div>
        </div>
        <div className="screen-content">
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    )
  }
}