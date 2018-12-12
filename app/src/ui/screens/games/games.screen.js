import React, { Component, Fragment } from 'react'
import { GameCard, Input, Button, Image } from '@components'
import './styles.scss'
import { JogoService, LocacaoService } from '@services';
import { BaseForm } from './sections/base-form.section'
import moment from 'moment'

export class GamesScreen extends Component {
	state = {
		initialGames: [],
		games: [],
		gameName: '',
		gameImageUrl: '',
		gameId: '',
		renterName: '',
		shouldRenderForm: false,
		shouldRenderDetail: false,
		shouldRenderEditForm: false,
		shouldRenderRentForm: false
	}
	jogoService = new JogoService()
	locacaoService =  new LocacaoService()

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

	onEditGameClick = () => {
		this.setState({ 
			shouldRenderEditForm: true, 
			shouldRenderDetail: false
		})
	}

	onRentGameClick = () => {
		this.setState({ 
			shouldRenderRentForm: true, 
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
			this.setState({ shouldRenderForm: false, gameId: '', gameName: '', gameImageUrl: '' })	
			this.getGames()
		})
	}

	rentGame = (event) => {
		event.preventDefault()

		const data = {
			id: this.state.gameId,
			renterName: this.state.renterName,
			date: moment().format('DD-MM-YYYY')
		}

		this.locacaoService.rentGame(data).then(() =>  {
			this.setState({ shouldRenderRentForm: false, gameId: '', gameName: '', gameImageUrl: '', renterName: '' })	
		})
	}

	editGame = (event) => {
		event.preventDefault()

		const data = {
			id: this.state.gameId,
			name: this.state.gameName,
			imageUrl: this.state.gameImageUrl
		}

		this.jogoService.editGame(data).then(() =>  {
			this.setState({ shouldRenderEditForm: false, gameId: '', gameName: '', gameImageUrl: '' })	
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

	renderEditForm() {
		const { gameName, gameImageUrl } = this.state

		return (
			<BaseForm title="Editar Jogo" changeAction={this.handleChange} actions={() => (
				<Button customStyle="game-button" typeClass="primary" type="submit">
					Salvar
				</Button>
			)} submitAction={this.editGame} gameName={gameName} gameImageUrl={gameImageUrl} gameId={this.state.gameId}/>
		)
	}

	renderGameDetail() {
		return (
			<BaseForm title="Detalhe Jogo" readOnly actions={() => (
				<div className="game-detail-actions">
					<Button customStyle="game-button" typeClass="primary" type="button" onClick={this.onRentGameClick}>
						Alugar
					</Button>
					<Button customStyle="game-button" typeClass="primary" type="button" onClick={this.onEditGameClick}>
						Editar
					</Button>
					<Button customStyle="game-button delete-game-button" typeClass="secondary" type="button" onClick={this.deleteGame}>
						<span>{Image.ICONS.Close}  Deletar</span>
					</Button>
				</div>
			)} gameName={this.state.gameName} gameImageUrl={this.state.gameImageUrl} gameId={this.state.gameId}/>
		)
	}

	renderRentForm() {
		return (
			<div className="form-container-rent">
				<div className="form-container-rent-wrapper">
					<div>
						<h3>Aluguel de {this.state.gameName}</h3>
						<form onSubmit={this.rentGame}>
							<Input label="Nome do Locador" placeholder="Nome do locador" 
								type="text" onChange={this.handleChange} value={this.state.renterName}
								name="renterName"/>
							
							<Button customStyle="game-button" typeClass="primary" type="submit">
								Salvar
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
						{ this.state.shouldRenderEditForm && this.renderEditForm() }
						{ this.state.shouldRenderDetail && this.renderGameDetail() }
						{ this.state.shouldRenderRentForm && this.renderRentForm() }
						<section className="games-list">
							{ this.renderGameCard() }
						</section>
					</div>
			</Fragment>
		)
	}
}