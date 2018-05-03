import cookie from "react-cookies";

export default class AuthService {
  static setToken(token) {
    cookie.save('token', token)
  }

  static getToken() {
    return cookie.load('token')
  }

  static removeToken() {
    cookie.remove('token')
  }
}
