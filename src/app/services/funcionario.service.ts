import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  http = inject(HttpClient);
  API = '/api/funcionario';

  constructor() {}

  findByCpf(cpf: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.API}/findByCpf?cpf=${cpf}`);
  }
}
