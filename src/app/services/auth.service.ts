import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: 'CLIENTE' | 'FUNCIONARIO' | null = null;
  private user: Cliente | Funcionario | null = null;

  constructor() {
    const savedRole = localStorage.getItem('role');
    const savedUser = localStorage.getItem('user');

    if (savedRole) {
      this.role = savedRole as 'CLIENTE' | 'FUNCIONARIO';
    }

    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  setRole(role: 'CLIENTE' | 'FUNCIONARIO') {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): 'CLIENTE' | 'FUNCIONARIO' | null {
    return this.role;
  }

  setUser(user: Cliente | Funcionario) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Cliente | Funcionario | null {
    return this.user;
  }

  isFuncionario(): boolean {
    return this.getRole() === 'FUNCIONARIO';
  }

  isCliente(): boolean {
    return this.getRole() === 'CLIENTE';
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  logout() {
    this.role = null;
    this.user = null;
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  }
}
