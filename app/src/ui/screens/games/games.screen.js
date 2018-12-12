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
		gameId: '',
		shouldRenderForm: false,
		shouldRenderDetail: false
	}
	jogoService = new JogoService()

	componentDidMount() {
		this.getGames()
	}

	getGames() {
		this.jogoService.get().then(
			result => {
				const games = result.data.map( game => ({ id: game.id, name: game.nome, image: game.url_imagem }))
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
		this.setState({ 
			shouldRenderForm: !this.state.shouldRenderForm, 
			shouldRenderDetail: false
		})
	}

	onGameCardClick  = (game) => {
		this.setState({ shouldRenderDetail: true, 
			shouldRenderForm: false,
			gameName: game.name, 
			gameId: game.id, 
			gameImageUrl: game.image 
		})
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

	deleteGame = (event) => {
		event.preventDefault()

		this.jogoService.delete({id: this.state.gameId}).then(() =>  {
			this.setState({ shouldRenderDetail: false })	
			this.getGames()
		})
	}

	renderAddForm() {
		const { gameName, gameImageUrl } = this.state
		return (
			<BaseForm title="Novo Jogo" changeAction={this.handleChange} actions={() => (
				<Button customStyle="game-button" typeClass="primary" type="submit">
					Salvar
				</Button>
			)} submitAction={this.addGame} gameName={gameName} gameImageUrl={gameImageUrl}/>
		)
	}

	renderGameDetail() {
		return (
			<BaseForm title="Detalhe Jogo" actions={() => (
				<div className="game-detail-actions">
					<Button customStyle="game-button" typeClass="primary" type="button">
						Alugar
					</Button>
					<Button customStyle="game-button" typeClass="primary" type="button">
						Editar
					</Button>
					<Button customStyle="game-button delete-game-button" typeClass="secondary" type="button" onClick={this.deleteGame}>
						<span>{Image.ICONS.Close}  Deletar</span>
					</Button>
				</div>
			)} gameName={this.state.gameName} gameImageUrl={this.state.gameImageUrl} gameId={this.state.gameId}/>
		)
	}

	renderGameCard() {
		return this.state.games.map(game => (
			<GameCard name={game.name} image={game.image} onClick={() => this.onGameCardClick(game)} />
		))
	}

	render() {
		return (
				<Fragment>
					<h2>Games</h2>
					<div className="games-container">
						<header>
							<Input label="Buscar Jogos" placeholder="Digite o nome do seu jogo" type="text" onChange={this.onSearchChange}/>
							<Button customStyle="game-button" typeClass="primary" onClick={this.onAddGameClick}>
								<span>{Image.ICONS.Gamepad} Adicionar Jogo</span>
							</Button>
						</header>
						{ this.state.shouldRenderForm && this.renderAddForm() }
						{ this.state.shouldRenderDetail && this.renderGameDetail() }
						<section className="games-list">
							{ this.renderGameCard() }
						</section>
					</div>
			</Fragment>
		)
	}
}