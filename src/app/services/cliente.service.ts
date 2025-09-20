import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  http = inject(HttpClient);
  API = '/api/cliente';

  constructor() {}

  findByEmail(email: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/findByEmail?email=${email}`);
  }

  create(dto: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.API}/save`, dto);
  }
}
