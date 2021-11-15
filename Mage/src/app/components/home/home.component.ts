import { Component, OnInit } from '@angular/core';
import {Producto} from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../services/producto.service';
import {Usuario} from 'src/app/interfaces/interfaces';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

usuarioLogeado: Usuario;
productosDestacados: Producto[];
grandesDescuentos: Producto[];
productosNuevos: Producto[];
productosMenos10: Producto[];
productosMenos20: Producto[];
primerDestacado: Producto;
rolUsuarioLogeado;
  constructor(private productoService : ProductoService, private usuarioService : UsuarioService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.inicializarPrimerDestacado();

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));

    this.obtenerPrimerDestacado();
    this.obtenerProductosDestacados();
    this.obtenerGrandesOfertas();
    this.obtenerNuevos();
    this.obtenerMenos10();
    this.obtenerMenos20();

  }

  inicializarPrimerDestacado(){
    this.primerDestacado = {
      id: null,
      nombre : null,
      precio : null,
      descripcion : null,
      video : null,
      fecha_salida : null,
      desarrolladora : null,
      descuento : null,
      activo : null,
      img : null
    }
  }

  obtenerProductosDestacados(){
    this.productoService.getListaDestacados().subscribe(data => {
      this.productosDestacados = data;
    });
  }

  obtenerGrandesOfertas(){
    this.productoService.getGrandesOfertas().subscribe(data => {
      this.grandesDescuentos = data;
    });
  }

  obtenerNuevos(){
    this.productoService.getNuevos().subscribe(data => {
      this.productosNuevos = data;
    });
  }

  obtenerMenos10(){
    this.productoService.getMenos10().subscribe(data => {
      this.productosMenos10 = data;
    });
  }

  obtenerMenos20(){
    this.productoService.getMenos20().subscribe(data => {
      this.productosMenos20 = data;
    });
  }

  obtenerPrimerDestacado(){
    this.productoService.getPrimerDestacado().subscribe(data => {
      this.primerDestacado = data;
    });
  }


  irAsistencia(){
    this.router.navigate(['/asistencia']);
  }

  irGestion(){
    this.router.navigate(['/asistencia']);
  }

  irMisTickets(){
    this.router.navigate(['/asistencia']);
  }

  irAProducto(id: number){
    var idProducto = JSON.stringify({"id" : id});
    sessionStorage.setItem("idProducto",idProducto);
    this.router.navigate(['/producto']);

  }

  irAPerfil(){
    this.router.navigate(['/asistencia']);
  }
  
}
