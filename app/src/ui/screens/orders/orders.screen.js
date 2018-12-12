import React, { Component } from 'react'
import { LocacaoService } from '@services';

export class OrdersScreen extends Component {
	state = {
		locacoes: []
	}

	locacaoService =  new LocacaoService()

	componentDidMount() {
		this.getLocacao()
	}

	getLocacao() {
		this.locacaoService.get().then(result => {
			const locacoes = result.data.map( 
				locacao => ({ 
					userName: locacao.nome_usuario,
					dateLocacao: locacao.data_locacao, 
					dateDevolucao: locacao.data_devolucao,
					name: locacao.jogo.nome, 
					image: locacao.jogo.url_imagem 
				}))
			this.setState({ locacoes })
		})
	}

	render () {
		return 	<h2>Pedidos</h2>
	}
}