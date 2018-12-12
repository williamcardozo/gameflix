export class UserService {
  constructor() {
    this.USER_KEY = 'GAMEFLIX_USER'
  }

  saveUser(user) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user.data))
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem(this.USER_KEY))

    return user
  }

  removeUser() {
    localStorage.removeItem(this.USER_KEY)
  }
}