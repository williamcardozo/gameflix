import { BaseService } from "../base.service";

export class LocacaoService extends BaseService {
  constructor() {
    super('locacao.php')
  }

  rentGame({id, renterName, date}) {
    const data = {
      jogo_id: id,
      nome_usuario: renterName,
      data_locacao: date
    }

    return super.post(data)
  }
}