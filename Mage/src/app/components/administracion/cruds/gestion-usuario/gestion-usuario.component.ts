import { Component, OnInit, ViewChild } from '@angular/core';
import {Usuario} from 'src/app/interfaces/interfaces';
import {UsuarioService} from '../../../../services/usuario.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss']
})
export class GestionUsuarioComponent implements OnInit {

  listaUsuarios: Usuario[];
  usuarioLogeado: Usuario;
  nombresDeColumnas: string[] = ['Foto de perfil','Nombre de usuario','Email','Nombre','Primer apellido','Segundo apellido','Dni','Saldo','Rol', 'Funcion1'];
  rolUsuarioLogeado;
  
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private usuarioService: UsuarioService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.usuarioService.cambiarUsuarioLogeado.subscribe(nuevoUsuarioLogeado => {
      this.usuarioLogeado = nuevoUsuarioLogeado;
    });

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4 ) ){
      this.router.navigate(['/']);
    }

    this.obtenerDatosUsuarios();

  }

  obtenerDatosUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data => {
      this.listaUsuarios = data;
      console.log(data);
    });
  }

  volverAGestion(){
    this.router.navigate(['/gestion']);
  }

  crearUsuario(){
    this.router.navigate(['/gestion/usuarios/crear']);
  }

  modificarUsuario(id:number){

    var idUsuario = JSON.stringify({"id" : id});
    sessionStorage.setItem("idUsuarioMod", idUsuario);
    this.router.navigate(['/gestion/usuarios/modificar']);
  }

  eliminarUsuario(id:number){
    //PONER DIALOG PARA CONFIRMAR?
    this.usuarioService.eliminarUsuario(id).subscribe(mensaje =>{
      if(mensaje["result"] == "error"){
        this.dialogService.abrirDialogError('No ha sido posible eliminar el usuario');
      }
      if(mensaje["result"] == "exito"){
        this.dialogService.abrirDialogInfo('Usuario eliminado correctamente');
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
