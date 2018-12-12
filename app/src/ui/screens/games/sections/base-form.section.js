import React from 'react'
import { GameCard, Input } from '@components'
import './styles.scss'

export const BaseForm = ({
	title, 
	actions, 
	readonly, 
	submitAction, 
	changeAction, 
	gameName, 
	gameImageUrl 
}) =>  {
	return (
		<div className="form-container">
			<div className="form-container-wrapper">
				<div>
					<h3>{title}</h3>
					<form className="form-game" onSubmit={submitAction}>
						<Input readonly={readonly} label="Nome" placeholder="Nome do jogo" 
							type="text" onChange={changeAction} value={gameName}
							name="gameName"/>
						<Input readonly={readonly} label="Url da Imagem" placeholder="Url da Imagem do jogo" 
							type="text" onChange={changeAction} value={gameImageUrl}
							name="gameImageUrl"/>

						{actions()}
					</form>
				</div>
				<GameCard name={gameName} image={gameImageUrl} />		
			</div>
		
			<div className="line"></div>
		</div>			
	)
}