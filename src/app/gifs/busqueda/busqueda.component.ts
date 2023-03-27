import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar(): void {
    const termino = this.txtBuscar.nativeElement.value;

    if (termino.trim().length === 0) {
      return;
    }
    
    this.gifsService.buscarGifs(termino);

    this.txtBuscar.nativeElement.value = '';
  }

}
