import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  http = inject(HttpClient);
  API = '/api/pedidos';

  findAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  findById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.API}/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }

  update(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API}/${pedido.id}`, pedido);
  }

  save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }

  constructor() {}
}
