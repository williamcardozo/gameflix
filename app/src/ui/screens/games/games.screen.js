import React, { Component, Fragment } from 'react'
import { GameCard, Input, Button, Image } from '@components'
import './styles.scss'

export class GamesScreen extends Component {
	state = {
		initialGames: [],
		games: []
	}

	componentDidMount() {
		const games = [ 
			{ 
				name: 'Monster Hunter World', 
				image: 'https://s3.amazonaws.com/comparegame/thumbnails/43130/large.jpg' 
			}, 
			{
				name: 'Red Dead Redemption 2', 
				image: 'https://images-na.ssl-images-amazon.com/images/I/91C8piUiI0L._SX342_.jpg' 
			}, 
			{
				name: 'God of War', 
				image: 'https://images-na.ssl-images-amazon.com/images/I/51po2bu7VnL.jpg' 
			}  
		]

		this.setState({ games, initialGames: games })
	}

	onSearchChange = (event) => {
		const target = event.target

		const filteredGames = this.state.initialGames.filter(game => game.name.includes(target.value)) 
		this.setState({ games: filteredGames })
	}

	renderGameCard() {
		return this.state.games.map(game => (
			<GameCard name={game.name} image={game.image} />
		))
	}

	render () {
		return (
				<Fragment>
					<h2>Games</h2>
					<div className="games-container">
						<header>
							<Input label="Buscar Jogos" placeholder="Digite o nome do seu jogo" type="text" onChange={this.onSearchChange}/>
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