import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { TicketService } from '../../../../services/ticket.service';
import { AutenticadorJwtService } from '../../../../services/autenticador-jwt.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogService} from '../../../../services/dialog.service'
import { CategoriaTicket, Ticket } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modificar-ticket',
  templateUrl: './modificar-ticket.component.html',
  styleUrls: ['./modificar-ticket.component.scss']
})
export class ModificarTicketComponent implements OnInit {


  ticket: Ticket;
  ticketForm: FormGroup;
  idUsuarioLogeado;
  usuarioLogeado;
  rolUsuarioLogeado;
  idTicket;

  constructor(private usuarioService: UsuarioService, private ticketService: TicketService, private router: Router
    ,private autenticadorJwtService: AutenticadorJwtService, private dialogService: DialogService) { }

  ngOnInit(): void {
    
    this.ticketForm = new FormGroup({
      mensaje: new FormControl('',[Validators.required,  Validators.maxLength(250)])
    });

    this.idTicket = JSON.parse(sessionStorage.getItem("idTicket"));
    if(this.idTicket == null){
      this.router.navigate(['/tickets/misTickets']);
    }else{
      this.obtenerDatosTicket(this.idTicket.id);
    }

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

  obtenerDatosTicket(id: number){
    this.ticketService.obtenerTicket(id).subscribe(data => {
      this.ticket = data;
      this.ticketForm.controls.mensaje.setValue(this.ticket.mensaje);
    });
  }

  modificarTicket(){  
    this.ticketService.modificarTicket(this.ticket.id,this.ticketForm.controls.mensaje.value).subscribe(dato => {
      if(dato["result"] == "ticket_creado"){
        this.dialogService.abrirDialogInfo('Ticket modificado correctamente');
        this.router.navigate(['/tickets/misTickets']);

      }else{
        this.dialogService.abrirDialogError('Ticket no modificado');
      }
    }) ;
  }

  
  irATickets(){
    this.router.navigate(['tickets/misTickets']);
  }

}