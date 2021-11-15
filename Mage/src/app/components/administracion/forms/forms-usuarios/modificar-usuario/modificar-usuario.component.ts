import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../../services/usuario.service';
import { AutenticadorJwtService } from '../../../../../services/autenticador-jwt.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../../../../services/dialog.service';
import { Rol, Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  registroForm: FormGroup;
  usuarioSeleccionado: Usuario;
  ocultarPassword: boolean = true;
  idUsuarioLogeado;
  rolUsuarioLogeado;
  idUsuarioAModificar;
  roles: Rol[];

  constructor(private usuarioService: UsuarioService, private router: Router
    ,private autenticadorJwtService: AutenticadorJwtService, private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    //FALTA EMAIL Y PASSWORD PERO REUSAR PARA MODIFICAR
    this.idUsuarioAModificar = JSON.parse(sessionStorage.getItem("idUsuarioMod"));
    if(this.idUsuarioAModificar == null){
      this.router.navigate(['gestion/usuarios']);
    }else{
      this.obtenerDatosUsuario(this.idUsuarioAModificar.id);
    }

    this.registroForm = new FormGroup({
      username: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      dni: new FormControl('',[Validators.required,  Validators.maxLength(9)]),
      nombre: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      primer_apellido: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      segundo_apellido: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      rol: new FormControl('',[Validators.required])
    });

    this.obtenerDatosRoles();

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4 ) ){
      this.router.navigate(['/']);
    }
  }

  modificarUsuario() {
    
    this.usuarioService.modificarUsuario(this.idUsuarioAModificar.id, this.registroForm.controls.username.value, this.registroForm.controls.dni.value, this.registroForm.controls.nombre.value,
      this.registroForm.controls.primer_apellido.value, this.registroForm.controls.segundo_apellido.value, this.registroForm.controls.rol.value).subscribe(dato => {
        if(dato["result"] == "usuario_modificado"){
          this.dialogService.abrirDialogInfo('Usuario modificado correctamente');
          this.router.navigate(['gestion/usuarios']);
        }
        if(dato["result"] == "error_username"){
          this.dialogService.abrirDialogError('Ya existe una cuenta con ese nombre de usuario');
          }
        if(dato["result"] == "error_dni"){
            this.dialogService.abrirDialogError('Ya existe una cuenta con ese DNI');
          }
    }) ;
  }

  obtenerDatosRoles(){
    this.usuarioService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  obtenerDatosUsuario(id: number){
    this.usuarioService.getUsuario(id).subscribe(data => {
      this.usuarioSeleccionado = data;
      this.registroForm.controls.username.setValue(this.usuarioSeleccionado.username);
      this.registroForm.controls.nombre.setValue(this.usuarioSeleccionado.nombre);
      this.registroForm.controls.dni.setValue(this.usuarioSeleccionado.dni);
      this.registroForm.controls.primer_apellido.setValue(this.usuarioSeleccionado.primer_apellido);
      this.registroForm.controls.segundo_apellido.setValue(this.usuarioSeleccionado.segundo_apellido);
      this.registroForm.controls.rol.setValue(this.usuarioSeleccionado.id_rol);
    });
  }

  irAUsuarios(){
    this.router.navigate(['gestion/usuarios']);
  }

}