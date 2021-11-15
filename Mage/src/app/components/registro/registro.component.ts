import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../services/dialog.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  ocultarPassword: boolean = true;
  idUsuarioLogeado;

  constructor(private usuarioService: UsuarioService, private router: Router
    ,private autenticadorJwtService: AutenticadorJwtService, private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(250)]),
      password: new FormControl('',[Validators.required, Validators.minLength(4),  Validators.maxLength(250)]),
      username: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      dni: new FormControl('',[Validators.required,  Validators.maxLength(9)]),
      nombre: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      primer_apellido: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      segundo_apellido: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
    });

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
    if(this.idUsuarioLogeado != null){
      this.router.navigate(['/']);
    }
  }

  registraUsuario() {
    
    this.usuarioService.registroUsuario(this.registroForm.controls.email.value, this.registroForm.controls.password.value, this.registroForm.controls.username.value,
      this.registroForm.controls.nombre.value, this.registroForm.controls.primer_apellido.value, this.registroForm.controls.segundo_apellido.value, this.registroForm.controls.dni.value).subscribe(dato => {

        if(dato["result"] == "usuario_creado"){
          this.dialogService.abrirDialogInfo('Usuario creado correctamente');
          this.router.navigate(['login']);
          this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
        }
        if(dato["result"] == "error_username"){
          this.dialogService.abrirDialogError('Ya existe una cuenta con ese nombre de usuario');
          }
        if(dato["result"] == "error_email"){
            this.dialogService.abrirDialogError('Ya existe una cuenta con esa dirección de email');
          }
        if(dato["result"] == "error_dni"){
            this.dialogService.abrirDialogError('Ya existe una cuenta con ese DNI');
          }
    }) ;
  }

  irALogin(){
    this.router.navigate(['login']);
  }

}
