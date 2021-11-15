import { Component, OnInit, Input } from '@angular/core';
import {Imagen} from '../../interfaces/interfaces';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.scss']
})
export class DescuentoComponent implements OnInit {

  @Input('imagen') imagen: Imagen;
  url;

  constructor() { }

  ngOnInit(): void {
    this.url = 'data:image/png;base64,' + this.imagen.img;
  }

}
