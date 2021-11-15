import { Component, OnInit } from '@angular/core';
import {Producto, Cesta} from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../services/producto.service';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {

  nombresDeColumnas: string[] = ['Imagen','Nombre','Funcion1','Precio'];
  listaCesta : Cesta[];
  rolUsuarioLogeado;
  idUsuarioLogeado;
  precioTotal: number;

  constructor(private productoService: ProductoService, private usuarioService:UsuarioService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.precioTotal = 0;

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1 ) ){
      this.router.navigate(['/']);
    }

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));

    this.obtenerCestaUsuario();

  }

  obtenerCestaUsuario(){
    this.usuarioService.getCestaUsuario(this.idUsuarioLogeado.id).subscribe(data => {
      this.listaCesta = data;
      this.getTotalCost();
    });
  }

  volverAHome(){
    this.router.navigate(['/']);
  }

  vaciarCesta(){
    this.usuarioService.vaciarCestaUsuario(this.idUsuarioLogeado.id).subscribe(data => {
      if(data["result"] == "correcto"){
        this.dialogService.abrirDialogInfo("La cesta se ha vaciado correctamente");
      }else{
        this.dialogService.abrirDialogError("No ha sido posible vaciar la cesta");
      }

      this.reloadCurrentRoute();
    });
  }

  irAPago(){
    var precioCesta = JSON.stringify({"total" : this.precioTotal});
    sessionStorage.setItem("precioCesta",precioCesta);
    this.router.navigate(['/pagar']);
  }

  eliminarProductoCesta(id_producto : number){
    this.usuarioService.eliminarProductoCesta(id_producto,this.idUsuarioLogeado.id).subscribe(data => {
      if(data["result"] != "correcto"){
        this.dialogService.abrirDialogError("No ha sido posible eliminar el producto de la cesta");
      }else{
        this.reloadCurrentRoute();
      }

    });
  }

  getTotalCost() {
    for(let linea of this.listaCesta){
      this.precioTotal = this.precioTotal + linea.precio;
    }
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
