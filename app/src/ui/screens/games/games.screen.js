import React, { Component, Fragment } from 'react'
import { GameCard, Input, Button, Image } from '@components'
import './styles.scss'
import { JogoService } from '@services';
import { BaseForm } from './sections/base-form.section'

export class GamesScreen extends Component {
	state = {
		initialGames: [],
		games: [],
		gameName: '',
		gameImageUrl: '',
		shouldRenderForm: false
	}
	jogoService = new JogoService()

	componentDidMount() {
		this.getGames()
	}

	getGames() {
		this.jogoService.get().then(
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

		const data = {
			name: this.state.gameName,
			imageUrl: this.state.gameImageUrl
		}

		this.jogoService.addGame(data).then(() =>  {
			this.setState({ shouldRenderForm: false })	
			this.getGames()
		})
	}

	renderAddForm() {
		const { gameName, gameImageUrl } = this.state
		return (
			<BaseForm title="Novo Jogo" changeAction={this.handleChange} actions={() => (
				<Button className="add-game-button" typeClass="button-primary" type="submit">
					<span>Salvar</span>
				</Button>
			)} submitAction={this.addGame} gameName={gameName} gameImageUrl={gameImageUrl}/>
		)
	}

	renderGameDetail() {
		return (
			<BaseForm title="Detalhe Jogo" actions={() => (
				<Button className="add-game-button" typeClass="button-primary" type="submit">
					<span>Salvar</span>
				</Button>
			)} readonly />
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
						{ this.state.shouldRenderForm && this.renderAddForm() }
						<section className="games-list">
							{ this.renderGameCard() }
						</section>
					</div>
			</Fragment>
		)
	}
}