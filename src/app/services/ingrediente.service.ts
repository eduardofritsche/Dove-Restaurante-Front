import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  http = inject(HttpClient);
  API = '/api/ingredientes';

  // Buscar todos os ingredientes
  findAll(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.API);
  }

  // Buscar por id
  findById(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.API}/${id}`);
  }

  // Criar novo ingrediente
  save(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.API, ingrediente);
  }

  // Atualizar ingrediente existente
  update(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(
      `${this.API}/${ingrediente.id}`,
      ingrediente
    );
  }

  // Deletar por id
  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }

  constructor() {}
}
