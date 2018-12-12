import React from "react"
import "./styles.scss"

const TableBody = ({ locacao }) =>
  locacao.map(
    ({ userName, dateLocacao, dateDevolucao, name, image }, index) => {
      return (
        <tr key={index}>
          <td>{userName}</td>
          <td>{name}</td>
          <td>{dateLocacao}</td>
          <td>{dateDevolucao}</td>
        </tr>
      )
    }
  )

export const TableLocacao = ({ locacao }) => {
  return (
    <section className="container-table">
      <div class="tbl-header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Jogo</th>
              <th>Data locacão</th>
              <th>Data devolução</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            <TableBody locacao={locacao} />
          </tbody>
        </table>
      </div>
    </section>
  )
}
