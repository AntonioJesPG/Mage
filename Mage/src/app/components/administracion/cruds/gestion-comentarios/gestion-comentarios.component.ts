import { Component, OnInit } from '@angular/core';
import {Comentario} from 'src/app/interfaces/interfaces';
import {ComentarioService} from '../../../../services/comentario.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-gestion-comentarios',
  templateUrl: './gestion-comentarios.component.html',
  styleUrls: ['./gestion-comentarios.component.scss']
})
export class GestionComentariosComponent implements OnInit {

  listaComentarios: Comentario[];
  nombresDeColumnas: string[] = ['Nombre de usuario','Nombre de producto','Mensaje','Fecha de creacion','Valoracion', 'Funcion1'];
  rolUsuarioLogeado;

  constructor(private comentarioService: ComentarioService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4 ) ){
      this.router.navigate(['/']);
    }

    this.obtenerDatosComentario();
  }

  mostrarDesc(descripcion : string){
    this.dialogService.abrirDialogProd_Desc(descripcion);
  }

  obtenerDatosComentario(){
    this.comentarioService.getComentarios().subscribe(data => {
      this.listaComentarios = data;
      console.log(data);
    });
  }

  volverAGestion(){
    this.router.navigate(['/gestion']);
  }

  modificarComentario(id:number){

    var idComentario = JSON.stringify({"id" : id});
    sessionStorage.setItem("idComentarioAModificar", idComentario);
    this.router.navigate(['/gestion/comentarios/modificar']);

  }

  eliminarComentario(id:number){
    this.comentarioService.eliminarComentario(id).subscribe(mensaje =>{
      if(mensaje["result"] == "comentario_eliminado"){
        this.dialogService.abrirDialogInfo('Comentario eliminado correctamente');
      }else{
        this.dialogService.abrirDialogError('No ha sido posible eliminar el comentario');
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
