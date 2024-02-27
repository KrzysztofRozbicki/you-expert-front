import jwtDecode from 'jwt-decode';
import axios from 'axios';

export class Auth {
  static putJWT(jwtValue) {
    return localStorage.setItem('expertToken', jwtValue);
  }
  static removeJWT() {
    return localStorage.removeItem('expertToken');
  }
  static getJWT() {
    return localStorage.getItem('expertToken');
  }
  static getJWT_andParse() {
    const token = Auth.getJWT();
    if (token) {
      return {
        userData: jwtDecode(token),
        token
      };
    }
    return null;
  }
  static addTokenHeader() {
    const jwt = Auth.getJWT();
    const authToken = jwt ? `Bearer ${jwt}` : '';
    return { Authorization: authToken };
  }
}

export const decodeToken = (token: string): any => jwtDecode(token);

export const setAuthorizationTokenToHeaders = (token?: string): void => {
  try {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (e) {
    console.error(e);
  }
};
