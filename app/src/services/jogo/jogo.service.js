import { BaseService } from "../base.service";

export class JogoService extends BaseService {
  constructor() {
    super('jogo.php')
  }

  addGame({name, imageUrl}) {
    const data = {
      nome: name,
      url_imagem: imageUrl
    }

    return super.post(data)
  }

  editGame({id, name, imageUrl}) {
    const data = {
      id: id,
      nome: name,
      url_imagem: imageUrl
    }

    return super.put(data)
  }
}