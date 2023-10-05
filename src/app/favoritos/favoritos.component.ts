import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  listaFavoritos: any[] = [];
  noticias: any[] = [];
  palabraClave: string = '';

  searchForm!: FormGroup;
  mostrarResultadosBusqueda = false;
  resultadosDeBusqueda: any[] = [];

  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) {
    this.searchForm = this.fb.group({
      title: [''],
    });
  }

  obtenerFavoritos(): void {
    this.servicesService.obtenerFavoritos().subscribe(
      (favoritos) => {
        this.listaFavoritos = favoritos;
        console.log(favoritos);
      },
      (error) => {
        console.error('Ocurrió un error al obtener favoritos', error);
      }
    );
  }

  buscarPorPalabraClave(): void {
    const title = this.searchForm.get('title')?.value;
    console.log('buscando: ', title);
    if (title && title.trim() !== '') {
      this.servicesService.buscarNoticia(title).subscribe((noticias) => {
        this.noticias = noticias.filter((noticia) =>
          noticia.title.toLowerCase().includes(title.toLowerCase())
        );
        console.log('Búsqueda en favoritos', this.noticias);
        this.mostrarResultadosBusqueda = true; // Cambia a true cuando hay resultados de búsqueda
      });
    } else {
      // Si la palabra clave está vacía, muestra todos los favoritos nuevamente
      this.obtenerFavoritos();
      this.mostrarResultadosBusqueda = false; // Cambia a false cuando no hay resultados de búsqueda
    }
  }

  //Bootstrap paginador
  //como hacer filtros en Angular

  eliminarDeFavoritos(id: number): void {
    this.servicesService.eliminarFavorito(id).subscribe(
      () => {
        this.listaFavoritos = this.listaFavoritos.filter(
          (favorito) => favorito.id !== id
        );
      },
      (error) => {
        console.error('Error al eliminar de favoritos', error);
        console.log(id);
      }
    );
  }
}
