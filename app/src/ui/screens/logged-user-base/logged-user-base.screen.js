import React, { Component } from 'react'
import { Image } from '@components'
import { UserService } from '@services'
import { routes } from './routes'
import { Link, Route, Redirect } from 'react-router-dom'
import './style.scss'

const SidebarHeader = ({user, logout}) => (
  <header>
    <div className="bottom-content">
      <div className="user">

        <img src={user.url_imagem} alt="imagem do usuario" />
        <span className="greetings">
          Olá, <span className="name">{user.nome}!</span>
        </span>

        <div className="quit">
          <button onClick={logout}> Sair  {Image.ICONS.Exit}</button>
        </div>
      </div>
    </div>
  </header>
)

const MenuItem = ({ icon, label, page }) => (
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

export class LoggedUserBaseScreen extends Component {
  state = {
    user: {},
    shouldRedirectToLogin: false
  }
  userService = new UserService()

  redirectToLogin() {
    this.setState({ shouldRedirectToLogin: true })
  }

  componentDidMount() {
    const user = this.userService.getUser()
    debugger
    if (user) {
      this.setState({ user })
    } else {
      this.redirectToLogin()
    }
  }

  onClickLogout = () => {
    this.userService.removeUser()
    this.redirectToLogin()
  }

  render() {
    if (this.state.shouldRedirectToLogin) {
      return <Redirect to="/" />
    }

    return (
      <div className="base-container">
        <div className="sidebar">

          <SidebarHeader user={this.state.user} logout={this.onClickLogout}/>
          <div className="menu">
            <MenuItem icon={Image.ICONS.Videogame} label="Games" page="/games" />
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