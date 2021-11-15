import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../services/dialog.service';
import {Producto, Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,private dialogService: DialogService, private router:Router) { }

  modForm: FormGroup;
  rolUsuarioLogeado;
  idUsuarioLogeado;
  editable = false;
  usuario : Usuario;
  productosComprados : Producto[];

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1) ){
      this.router.navigate(['/']);
    }else{
      this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
      this.obtenerDatosUsuario(this.idUsuarioLogeado.id);
      this.obtenerProductosCompradosUsuario(this.idUsuarioLogeado.id);
    }


    this.modForm = new FormGroup({
      email: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      username: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      dni: new FormControl('',[Validators.required,  Validators.maxLength(9)]),
      nombre: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      primer_apellido: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      segundo_apellido: new FormControl('',[Validators.required,  Validators.maxLength(250)])
    });
  }

  modificarUsuario() {
    this.editable = !this.editable;
  }

  guardarUsuarioModificado(){
    this.usuarioService.modificarUsuarioNormal(this.idUsuarioLogeado.id, this.modForm.controls.username.value, this.modForm.controls.nombre.value,
      this.modForm.controls.primer_apellido.value, this.modForm.controls.segundo_apellido.value).subscribe(dato => {
        if(dato["result"] == "usuario_modificado"){
          this.dialogService.abrirDialogInfo('Usuario modificado correctamente');
          this.reloadCurrentRoute();
        }
        if(dato["result"] == "error_username"){
          this.dialogService.abrirDialogError('Ya existe una cuenta con ese nombre de usuario');
          }
    }) ;
  }

  irAHome(){
    this.router.navigate(['/']);
  }

  obtenerDatosUsuario(id: number){
    this.usuarioService.getUsuario(id).subscribe(data => {
      this.usuario = data;
      this.modForm.controls.email.setValue(this.usuario.email);
      this.modForm.controls.username.setValue(this.usuario.username);
      this.modForm.controls.nombre.setValue(this.usuario.nombre);
      this.modForm.controls.dni.setValue(this.usuario.dni);
      this.modForm.controls.primer_apellido.setValue(this.usuario.primer_apellido);
      this.modForm.controls.segundo_apellido.setValue(this.usuario.segundo_apellido);
    });
  }

  obtenerProductosCompradosUsuario(id: number){
    this.usuarioService.obtenerComprados(id).subscribe(data => {
      this.productosComprados = data;
    });
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  descargar(){
    this.dialogService.abrirDialogDescarga("Descargando...");
  }

}
