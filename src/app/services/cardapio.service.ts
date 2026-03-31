import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cardapio } from '../models/cardapio';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {
  http = inject(HttpClient);
  API = `${environment.SERVIDOR}/api/cardapios`;

  findAll(): Observable<Cardapio[]> {
    return this.http.get<Cardapio[]>(this.API);
  }

  findById(id: number): Observable<Cardapio> {
    return this.http.get<Cardapio>(`${this.API}/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }

  update(cardapio: Cardapio): Observable<Cardapio> {
    return this.http.put<Cardapio>(`${this.API}/${cardapio.id}`, cardapio);
  }

  save(cardapio: Cardapio): Observable<Cardapio> {
    return this.http.post<Cardapio>(this.API, cardapio);
  }

  getCardapioDoDia(): Observable<Cardapio> {
    return this.http.get<Cardapio>(`${this.API}/hoje`);
  }

  constructor() {}
}
