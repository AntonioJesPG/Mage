import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../services/producto.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  productos: Producto[];

  constructor(private productoService:ProductoService, private router: Router) { }

  ngOnInit(): void {

    this.obtenerProductos();

  }

  obtenerProductos(){
    this.productoService.getCatalogo().subscribe(data => {
      this.productos = data;
    });
  }

  irAProducto(id: number){
    var idProducto = JSON.stringify({"id" : id});
    sessionStorage.setItem("idProducto",idProducto);
    this.router.navigate(['/producto']);

  }


}
