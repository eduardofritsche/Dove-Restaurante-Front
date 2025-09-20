import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {

  API = "/api/funcionario";

  constructor(private http: HttpClient) { }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}/findAll`);
  }

  findByID(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.API}/findById/${id}`);
  }

  findByCpf(cpf: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.API}/findByCpf?cpf=${cpf}`);
  }

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.API}/save`, funcionario);
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.API}/update/${funcionario.id}`, funcionario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

  // funcionario.service.ts
  getRelatorio(id: number): Observable<any> {
  return this.http.get<any>(`${this.API}/relatorio/${id}`);
}

}
