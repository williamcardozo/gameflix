import React, { Component } from "react"
import { LocacaoService } from "@services"
import { TableLocacao } from '@components'
import moment from "moment"

export class OrdersScreen extends Component {
  state = {
    locacoes: []
  }

  locacaoService = new LocacaoService()

  dateFormatFromApi = "YYYY-MM-DD";
  dateFormatToScreen = "DD/MM/YYYY";

  componentDidMount() {
    this.getLocacao()
  }

  formatDate = date =>
    moment(date, this.dateFormatFromApi).format(this.dateFormatToScreen)

  getLocacao() {
    this.locacaoService.get().then(result => {
      const locacoes = result.data.map(locacao => ({
        userName: locacao.nome_usuario,
        dateLocacao: this.formatDate(locacao.data_locacao),
        dateDevolucao: this.formatDate(locacao.data_devolucao),
        name: locacao.jogo.nome,
        image: locacao.jogo.url_imagem
      }))
      this.setState({ locacoes })
    })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Pedidos</h2>
        <div className="games-container">
				<section className="games-list">
						<TableLocacao locacao={this.state.locacoes} />
					</section>
        </div>
      </React.Fragment>
    )
  }
}
