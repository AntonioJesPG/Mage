import { Component, OnInit } from '@angular/core';
import {Producto} from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../../../services/producto.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss']
})


export class GestionProductosComponent implements OnInit {

  listaProductos: Producto[];
  nombresDeColumnas: string[] = ['Nombre','Precio','Descripcion','Video','Fecha Salida','Desarrolladora','Descuento','Activo', 'Funcion1'];
  dataSource: MatTableDataSource<Producto>
  rolUsuarioLogeado;
  constructor(private productoService: ProductoService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4 ) ){
      this.router.navigate(['/']);
    }

    this.obtenerDatosProductos();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarVideo(video : string){
    this.dialogService.abrirDialogVideo(video);
  }

  mostrarDesc(descripcion : string){
    this.dialogService.abrirDialogProd_Desc(descripcion);
  }

  obtenerDatosProductos(){
    this.productoService.getProductos().subscribe(data => {
      this.listaProductos = data;
      console.log(data);
    });
  }

  volverAGestion(){
    this.router.navigate(['/gestion']);
  }

  crearProducto(){
    this.router.navigate(['/gestion/productos/crear']);
  }

  modificarProducto(id: number){
    var idProducto = JSON.stringify({"id" : id});
    sessionStorage.setItem("idProductoMod", idProducto);
    this.router.navigate(['/gestion/productos/modificar']);
  }

  expandirProducto(id:number){

    var idProducto = JSON.stringify({"id" : id});
    sessionStorage.setItem("idProducto", idProducto);
    this.router.navigate(['/producto']);
  }

  desactivarProducto(id:number){
    this.productoService.desactivarProducto(id).subscribe(mensaje =>{
      if(mensaje["result"] == "error_activo"){
        this.dialogService.abrirDialogError('No ha sido posible desactivar el producto');
      }
      if(mensaje["result"] == "correcto"){
        this.dialogService.abrirDialogInfo('Producto desactivado correctamente');
      }
      this.reloadCurrentRoute();
    })
  }

  activarProducto(id:number){
    this.productoService.activarProducto(id).subscribe(mensaje =>{
      if(mensaje["result"] == "error_activo"){
        this.dialogService.abrirDialogError('No ha sido posible activar el producto');
      }
      if(mensaje["result"] == "correcto"){
        this.dialogService.abrirDialogInfo('Producto activado correctamente');
      }
      this.reloadCurrentRoute();
    })
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
