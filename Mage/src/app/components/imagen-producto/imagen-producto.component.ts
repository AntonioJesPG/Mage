import { Component, Input, OnInit } from '@angular/core';
import {Imagen} from '../../interfaces/interfaces';

@Component({
  selector: 'app-imagen-producto',
  templateUrl: './imagen-producto.component.html',
  styleUrls: ['./imagen-producto.component.scss']
})
export class ImagenProductoComponent implements OnInit {

  @Input('imagen') imagen: Imagen;

  constructor() { }


  ngOnInit(): void {
  }

}
