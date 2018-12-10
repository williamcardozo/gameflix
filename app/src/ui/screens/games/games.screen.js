import React, { Component, Fragment } from 'react'
import { GameCard } from '@components'

export class GamesScreen extends Component {

	render () {
		return (
			<Fragment>
				<h2>Games</h2>
				<GameCard name="Monster Hunter World" image="https://s3.amazonaws.com/comparegame/thumbnails/43130/large.jpg" />
				<GameCard name="Red Dead Redemption 2" image="https://images-na.ssl-images-amazon.com/images/I/91C8piUiI0L._SX342_.jpg" />
				<GameCard name="God of Warr" image="https://images-na.ssl-images-amazon.com/images/I/51po2bu7VnL.jpg" />
			</Fragment>
		)
	}
}