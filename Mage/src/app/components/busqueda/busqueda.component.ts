import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../services/producto.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  productos: Producto[];
  busqueda;

  constructor(private productoService:ProductoService, private router: Router) { }

  ngOnInit(): void {

    this.busqueda = JSON.parse(sessionStorage.getItem("busqueda"));
    console.log(this.busqueda);
    if(this.busqueda == null && this.busqueda.nombre == null){
      this.busqueda.nombre = "";
    }

    this.obtenerProductos();

  }

  obtenerProductos(){
    this.productoService.buscarProductos(this.busqueda.nombre).subscribe(data => {
      console.log(data);
      this.productos = data;
    });
  }

  irAProducto(id: number){
    var idProducto = JSON.stringify({"id" : id});
    sessionStorage.setItem("idProducto",idProducto);
    this.router.navigate(['/producto']);

  }

}
