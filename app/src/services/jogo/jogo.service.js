import { BaseService } from "../base.service";

export class JogoService extends BaseService {
  constructor() {
    super('jogo.php')
  }

  addGame({name, imageUrl}) {
    debugger
    const data = {
      nome: name,
      url_imagem: imageUrl
    }

    return super.post(data)
  }
}