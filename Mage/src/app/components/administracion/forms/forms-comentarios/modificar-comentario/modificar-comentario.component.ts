import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../../services/usuario.service';
import { ComentarioService } from '../../../../../services/comentario.service';
import { AutenticadorJwtService } from '../../../../../services/autenticador-jwt.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../../../../services/dialog.service'
import { CategoriaTicket, Comentario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modificar-comentario',
  templateUrl: './modificar-comentario.component.html',
  styleUrls: ['./modificar-comentario.component.scss']
})
export class ModificarComentarioComponent implements OnInit {

  comentario: Comentario;
  comentarioForm: FormGroup;
  idUsuarioLogeado;
  usuarioLogeado;
  rolUsuarioLogeado;
  idComentario;

  constructor(private usuarioService: UsuarioService, private comentarioService: ComentarioService, private router: Router
    ,private autenticadorJwtService: AutenticadorJwtService, private dialogService: DialogService) { }

  ngOnInit(): void {
    
    this.comentarioForm = new FormGroup({
      mensaje: new FormControl('',[Validators.required,  Validators.maxLength(250)])
    });

    this.idComentario = JSON.parse(sessionStorage.getItem("idComentarioAModificar"));
    if(this.idComentario == null){
      this.router.navigate(['gestion/comentarios']);
    }else{
      this.obtenerDatosComentario(this.idComentario.id);

    }

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
    if(this.idUsuarioLogeado != null){
      this.usuarioService.getUsuario(this.idUsuarioLogeado.id).subscribe(datos => {
        this.usuarioLogeado = datos;
      })
    }

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4)  ){
      this.router.navigate(['/']);
    }
  }

  obtenerDatosComentario(id: number){
    this.comentarioService.obtenerComentario(id).subscribe(data => {
      this.comentario = data;
      this.comentarioForm.controls.mensaje.setValue(this.comentario.mensaje);
    });
  }

  modificarComentario(){  
    this.comentarioService.modificarComentario(this.comentario.id,this.comentarioForm.controls.mensaje.value).subscribe(dato => {
      if(dato["result"] == "comentario_modificado"){
        this.dialogService.abrirDialogInfo('Comentario modificado correctamente');
        this.irAComentarios();

      }else{
        this.dialogService.abrirDialogError('Comentario no modificado');
      }
    }) ;
  }

  
  irAComentarios(){
    this.router.navigate(['gestion/comentarios']);
  }

}

