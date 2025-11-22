import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

API = "http://localhost:8080/api/usuario";

  http = inject(HttpClient);

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/findById/${id}`);
  }

  findPedidoById(id: number): Observable<number> {
    return this.http.get<number>(`${this.API}/findPedido/${id}`);
  }

  listarTempos(id: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.API}/listar-tempos/${id}`);
  }

  save(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.API}/save`, usuario);
  }

  update(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.API}/update/${id}`, usuario);
  }

  trocarSenha(id: number, dadosSenha: any): Observable<any> {
    return this.http.put(`${this.API}/senha/${id}`, dadosSenha);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

  findByNome(nome: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/findByNome?nome=${nome}`);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.API}/findByEmail?email=${email}`);
  }
}
