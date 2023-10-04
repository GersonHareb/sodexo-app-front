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

  constructor(private fb: FormBuilder, private servicesService: ServicesService) {
    this.searchForm = this.fb.group({
      palabraClave: [''],
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
    if (this.palabraClave.trim() !== '') {
      this.servicesService
        .buscarNoticia(this.palabraClave)
        .subscribe((noticias) => {
          this.noticias = noticias;
        });
    } else {
      // Si la palabra clave está vacía, muestra todos los favoritos nuevamente
      this.obtenerFavoritos();
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
