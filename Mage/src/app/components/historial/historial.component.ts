import { Component, OnInit } from '@angular/core';
import {Producto, Pedido, LineaPedido} from 'src/app/interfaces/interfaces';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  nombresDeColumnas: string[] = ['Codigo','Fecha','PrecioTotal','Function1'];
  listaHistorial : Pedido[];
  rolUsuarioLogeado;
  idUsuarioLogeado;
  precioTotal: number;

  constructor(private usuarioService: UsuarioService,private dialogService : DialogService, private router : Router) { }

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1 ) ){
      this.router.navigate(['/']);
    }

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));

    this.obtenerPedidosUsuario();

  }

  obtenerPedidosUsuario(){
    this.usuarioService.getHistorialUsuario(this.idUsuarioLogeado.id).subscribe(data => {
      this.listaHistorial = data;
    });
  }

  detalles(codigo: string){
    this.dialogService.abrirDialogTabla(codigo);
  }

  volverAHome(){
    this.router.navigate(['/']);
  }

}
