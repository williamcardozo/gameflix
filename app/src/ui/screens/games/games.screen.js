import React, { Component, Fragment } from 'react'
import { GameCard, Input, Button, Image } from '@components'
import './styles.scss'
import { JogoService } from '../../../services/jogo/jogo.service';

export class GamesScreen extends Component {
	state = {
		initialGames: [],
		games: []
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
						<Input label="Buscar Jogos" placeholder="Digite o nome do seu jogo" type="text" onChange={this.onSearchChange} />
						<Button className="add-game-button" typeClass="button-primary">
							<span>{Image.ICONS.Gamepad} Adicionar Jogo</span>
						</Button>
					</header>
					<section className="games-list">
						{this.renderGameCard()}
					</section>
				</div>
			</Fragment>
		)
	}
}