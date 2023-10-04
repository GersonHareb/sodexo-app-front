import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl = 'http://localhost:8080/api/noticias';
  private favoritos: any[] = [];

  constructor(private http: HttpClient) {
    const favoritosStr = localStorage.getItem('favoritos');
    if (favoritosStr) {
      this.favoritos = JSON.parse(favoritosStr);
    }
  }

  agregarFavorito(noticia: any): Observable<any> {
    const existeEnFavoritos = this.favoritos.some(
      (favorito) => favorito.id === noticia.id
    );
    if (!existeEnFavoritos) {
      this.favoritos.push(noticia);
      this.actualizarLocalStorage();
      return this.http.post<any>(this.apiUrl, noticia);
    } else {
      console.log('ya se encuentra en favoritos');
      return of(null);
    }
  }

  eliminarFavorito(id: number): Observable<void> {
    const index = this.favoritos.findIndex((favorito) => favorito.id === id);
    if (index !== -1) {
      this.favoritos.splice(index, 1);
      this.actualizarLocalStorage();
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private actualizarLocalStorage(): void {
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  obtenerFavoritos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  esFavorito(id: number): boolean {
    return this.favoritos.some((favorito) => favorito.id === id);
  }

  buscarNoticia(palabraClave: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?title=${palabraClave}`);
  }
}
