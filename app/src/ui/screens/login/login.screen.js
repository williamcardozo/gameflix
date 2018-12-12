import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Image } from '@components'
import './style.scss'
import { LoginService } from '../../../services/login/login.service';

export class LoginScreen extends Component {

  state = {
    login: '',
    senha: '',
  }

  loginService = new LoginService()

  handleChange = (event) => {
    const target = event.target

    this.setState({ [target.name]: target.value })
  }

  login(){
    this.loginService.post(this.state).then()
  }

  render() {
    return (
      <div className="base-container">
        {Image.ICONS.Videogame}
        <form className="form-game" onSubmit={this.login}>
          <Input label="Login" placeholder="Login"
            type="text" onChange={this.handleChange} value={this.state.login}
            name="login" />
          <Input label="Senha" placeholder="Senha"
            type="text" onChange={this.handleChange} value={this.state.senha}
            name="senha" />
          <Button className="add-game-button" typeClass="button-primary" type="submit">
            <span>Logar</span>
          </Button>
        </form>
      </div>
    )
  }
}