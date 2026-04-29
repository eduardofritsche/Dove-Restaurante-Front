import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';
// import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = `${environment.SERVIDOR}/api/login`;


  constructor() { }


  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode(): any {
    let token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return "";
  }

  hasRole(role: string): boolean {
    const payload = this.jwtDecode();
    if (payload && payload.realm_access && payload.realm_access.roles) {
      return payload.realm_access.roles.includes(role);
    }
    return false;
  }
  
  getUsuarioLogado(): any {
    return this.jwtDecode();
  }

  getUserRole(): string {
    if (this.hasRole('dove_admin') || this.hasRole('ADMIN')) return 'ADMIN';
    if (this.hasRole('dove_funcionario') || this.hasRole('FUNCIONARIO')) return 'FUNCIONARIO';
    if (this.hasRole('dove_cliente') || this.hasRole('CLIENTE')) return 'CLIENTE';
    return '';
  }
  

  
}
