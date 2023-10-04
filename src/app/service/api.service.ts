import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Noticia} from '../Interfaces/Noticia'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) {}

  public getData(url?: string): Observable<any> {
    const apiUrl = url || this.url;
    return this.http.get<any>(apiUrl);
  }

  buscarNoticiaAPI(palabraClave: string): Observable<Noticia> {
      console.log(
        `Llamando a buscarNoticiaAPI con palabraClave: ${palabraClave}`
      );
    return this.http.get<Noticia>(
      `${this.url}?title_contains=${palabraClave}`
    );
  }
  //https://api.spaceflightnewsapi.net/v4/articles/?title_contains=China
}
