import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { TicketService } from '../../../../services/ticket.service';
import { AutenticadorJwtService } from '../../../../services/autenticador-jwt.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../../../services/dialog.service'
import { CategoriaTicket } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-crear-ticket',
  templateUrl: './crear-ticket.component.html',
  styleUrls: ['./crear-ticket.component.scss']
})
export class CrearTicketComponent implements OnInit {

  ticketForm: FormGroup;
  idUsuarioLogeado;
  usuarioLogeado;
  rolUsuarioLogeado;
  categorias: CategoriaTicket[];

  constructor(private usuarioService: UsuarioService, private ticketService: TicketService, private router: Router
    ,private autenticadorJwtService: AutenticadorJwtService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      mensaje: new FormControl('',[Validators.required,  Validators.maxLength(250)]),
      categoria: new FormControl('',[Validators.required])
    });

    this.obtenerDatosCategorias();

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
    if(this.idUsuarioLogeado != null){
      this.usuarioService.getUsuario(this.idUsuarioLogeado.id).subscribe(datos => {
        this.usuarioLogeado = datos;
      })
    }

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1) ){
      this.router.navigate(['/']);
    }
  }

  obtenerDatosCategorias(){
    this.ticketService.getCategorias().subscribe(data => {
      this.categorias = data;
      console.log(data);
    });
  }

  crearTicket(){  
    console.log(this.ticketForm.controls.mensaje.value);
    this.ticketService.crearTicket(this.usuarioLogeado.id,this.ticketForm.controls.mensaje.value, this.ticketForm.controls.categoria.value).subscribe(dato => {
      if(dato["result"] == "ticket_creado"){
        this.dialogService.abrirDialogInfo('Ticket creado correctamente');
        this.router.navigate(['/tickets/misTickets']);

      }else{
        this.dialogService.abrirDialogError('Ticket no creado');
      }
    }) ;
  }

  
  irATickets(){
    this.router.navigate(['tickets']);
  }

}
