import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { LOGO } from '@assets'
import { Input, Button } from '@components'
import './style.scss'
import { LoginService, UserService } from '@services';

export class LoginScreen extends Component {

  state = {
    login: '',
    password: '',
    shouldRedirectToGames: false
  }
  userService = new UserService()
  loginService = new LoginService()

  handleChange = (event) => {
    const target = event.target

    this.setState({ [target.name]: target.value })
  }

  login= (event) => {
    event.preventDefault()

    const data = {
      login: this.state.login,
      senha: this.state.password
    }

    this.loginService.post(data).then((result) => {
      this.userService.saveUser(result)
      this.setState({ shouldRedirectToGames: true })
    })
  }

  render() {
    if(this.state.shouldRedirectToGames) {
      return <Redirect to="/games" />
    }

    return (
      <div className="login-container">
        <img src={LOGO} className="logo" alt="logo" />
        <form className="form-login" onSubmit={this.login} method="POST">
          <Input label="Login" placeholder="Login"
            type="text" onChange={this.handleChange} value={this.state.login}
            name="login" />
          <Input label="Senha" placeholder="Senha"
            type="password" onChange={this.handleChange} value={this.state.password}
            name="password" />
          <Button customStyle="login-button" typeClass="primary" type="submit">
            Logar
          </Button>
        </form>
      </div>
    )
  }
}