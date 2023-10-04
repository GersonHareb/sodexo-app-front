import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ServicesService } from '../service/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any = {
    count: 0,
    next: '',
    previous: null,
    results: [],
  };
  estaEnFavoritos: boolean = false;
  busqueda: string = '';
  nextPageUrl: string | null = null;
  previousPageUrl: string | null = null;

  //chat
  resultadosDeBusqueda: any[] = [];
  mostrarResultadosBusqueda = false;
  searchForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private favoritoService: ServicesService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      title: [''], // Puedes agregar validadores si es necesario
    });
  }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData().subscribe((data: any) => {
      this.data = data;
      this.nextPageUrl = data.next;
      this.previousPageUrl = data.previous;
      console.log('pagina', data.next);
      console.log(this.data);
      this.data.results.forEach((noticia: any) => {
        noticia.esFavorito = this.favoritoService.esFavorito(noticia.id);
      });
    });
  }

  buscar(): void {
    const title = this.searchForm?.get('title')?.value;
    if (title) {
      this.apiService.buscarNoticiaAPI(title).subscribe(
        (result) => {
          this.resultadosDeBusqueda = result.results;
          this.mostrarResultadosBusqueda = true;
          console.log('resultados busqueda: ', result);
        },
        (error) => {
          console.error('Error de la respuesta API: ', error);
        }
      );
    }
  }

  //

  marcarComoFavorito(noticia: any) {
    if (!this.favoritoService.esFavorito(noticia.id)) {
      this.favoritoService.agregarFavorito(noticia).subscribe(
        (response) => {
          console.log('Agregado a favoritos');
          noticia.esFavorito = true; // Actualizar el estado local
        },
        (error) => {
          console.error('Error al guardar', error);
        }
      );
    } else {
      console.log('Ya se encuentra en favoritos');
    }
  }

  eliminarDeFavoritos(noticia: any) {
    this.favoritoService.eliminarFavorito(noticia.id).subscribe(
      () => {
        console.log('Eliminado de favoritos');
        noticia.esFavorito = false; // Actualizar el estado local
      },
      (error) => {
        console.error('Error al eliminar', error);
      }
    );
  }

  esFavorito(noticia: any): boolean {
    return this.favoritoService.esFavorito(noticia.id);
  }

  cargarSiguientePagina(): void {
    if (this.nextPageUrl) {
      this.apiService.getData(this.nextPageUrl).subscribe((data: any) => {
        this.data = data;
        this.nextPageUrl = data.next;
        this.previousPageUrl = data.previous;
        this.resultadosDeBusqueda = data.results; // Actualiza resultados de búsqueda si es necesario
        console.log(this.data);
        this.data.results.forEach((noticia: any) => {
          noticia.esFavorito = this.favoritoService.esFavorito(noticia.id);
        });
      });
    }
  }

  cargarPaginaAnterior(): void {
    if (this.previousPageUrl) {
      this.apiService.getData(this.previousPageUrl).subscribe((data: any) => {
        this.data = data;
        this.nextPageUrl = data.next;
        this.previousPageUrl = data.previous;
        this.resultadosDeBusqueda = data.results; // Actualiza resultados de búsqueda si es necesario
        console.log(this.data);
        this.data.results.forEach((noticia: any) => {
          noticia.esFavorito = this.favoritoService.esFavorito(noticia.id);
        });
      });
    }
  }
}
