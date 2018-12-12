import React, { Component, Fragment } from 'react'
import { GameCard, Input, Button, Image } from '@components'
import './styles.scss'
import { JogoService } from '../../../services/jogo/jogo.service';

export class GamesScreen extends Component {
	state = {
		initialGames: [],
		games: [],
		gameName: '',
		gameImageUrl: '',
		shouldRenderForm: false
	}

	componentDidMount() {
		const jogoService = new JogoService()
		jogoService.get().then(
			result => {
				const games = result.data.map( g => ({ name: g.nome, image: g.url_imagem }))
				this.setState({ games, initialGames: games })
			}
		)
	}

	onSearchChange = (event) => {
		const target = event.target

		const filteredGames = this.state.initialGames.filter(game => game.name.toLowerCase().includes(target.value.toLowerCase()))
		this.setState({ games: filteredGames })
	}

	onAddGameClick = () => {
		this.setState({ shouldRenderForm: !this.state.shouldRenderForm})
	}

	handleChange = (event) => {
		const target = event.target

		this.setState({ [target.name]: target.value })
	}

	addGame = (event) => {
		event.preventDefault()
	}

	renderAddForm() {
		return (
			<div className="form-container">
				<div className="form-container-wrapper">
					<div>
						<h3>Novo Jogo</h3>
						<form className="form-game" onSubmit={this.addGame}>
								<Input label="Nome" placeholder="Nome do jogo" 
									type="text" onChange={this.handleChange} value={this.state.gameName}
									name="gameName"/>
								<Input label="Url da Imagem" placeholder="Url da Imagem do jogo" 
									type="text" onChange={this.handleChange} value={this.state.gameImageUrl}
									name="gameImageUrl"/>

								<Button className="add-game-button" typeClass="button-primary" type="submit">
									<span>Salvar</span>
								</Button>

						</form>
					</div>
					<GameCard name={this.state.gameName} image={this.state.gameImageUrl} />		
				</div>
			
				<div className="line"></div>
			</div>			
		)
	}

	renderGameCard() {
		return this.state.games.map(game => (
			<GameCard name={game.name} image={game.image} />
		))
	}

	render() {
		return (
				<Fragment>
					<h2>Games</h2>
					<div className="games-container">
						<header>
							<Input label="Buscar Jogos" placeholder="Digite o nome do seu jogo" type="text" onChange={this.onSearchChange}/>
							<Button className="add-game-button" typeClass="button-primary" onClick={this.onAddGameClick}>
								<span>{Image.ICONS.Gamepad} Adicionar Jogo</span>
							</Button>
						</header>
						{this.state.shouldRenderForm && this.renderAddForm()}
						<section className="games-list">
							{this.renderGameCard()}
						</section>
					</div>
			</Fragment>
		)
	}
}