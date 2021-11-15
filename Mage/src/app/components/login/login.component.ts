import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  ocultarPassword: boolean = true;
  idUsuarioLogeado;
  rolUsuarioLogeado;

  constructor(private usuarioService: UsuarioService, private router: Router
      ,private autenticadorJwtService: AutenticadorJwtService
      ,private dialogService: DialogService
    ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email,  Validators.maxLength(250)]),
      password: new FormControl('',[Validators.required, Validators.minLength(4),  Validators.maxLength(250)])
    });

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
    if(this.idUsuarioLogeado != null){
      this.router.navigate(['/']);
    }

  }

  autenticaUsuario() {
    
    this.usuarioService.autenticaUsuario(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(dato => {
      if(dato.jwt != undefined){
        this.autenticadorJwtService.almacenaJWT(dato.jwt);
        this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
        this.router.navigate(['/']);

      }else{
        this.dialogService.abrirDialogError('Usuario y/o contraseña incorrectos');
      }
    }) ;
  }

  irARegistro(){
    this.router.navigate(['registro']);
  }


}
