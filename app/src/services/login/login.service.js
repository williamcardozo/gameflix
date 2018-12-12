import { BaseService } from "../base.service";

export class LoginService extends BaseService {
  constructor() {
    super('login.php')
  }

  fazerLogin({login, senha}) {
    const data = {
      login,
      senha
    }

    return super.post(data)
  }
}