import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  API = `${environment.apiUrl}/api/usuario`;

  http = inject(HttpClient);

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  findPedidoById(id: number): Observable<number> {
    return this.http.get<number>(`${this.API}/findPedido/${id}`);
  }

  listarTempos(id: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.API}/listar-tempos/${id}`);
  }

  save(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.API}`, usuario);
  }

  update(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.API}/${id}`, usuario);
  }

  trocarSenha(id: number, dadosSenha: any): Observable<any> {
    return this.http.put(`${this.API}/senha/${id}`, dadosSenha);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  findByNome(nome: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/findByNome?nome=${nome}`);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.API}/findByEmail?email=${email}`);
  }

  findByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.API}/findByUsername?username=${username}`);
  }

  getRelatorio(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/relatorio/${id}`);
  }

  findByID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/findById/${id}`);
  }
}
