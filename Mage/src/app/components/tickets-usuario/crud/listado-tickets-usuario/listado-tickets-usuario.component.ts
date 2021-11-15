import { Component, OnInit } from '@angular/core';
import {Ticket, Usuario} from 'src/app/interfaces/interfaces';
import {TicketService} from '../../../../services/ticket.service';
import {UsuarioService} from '../../../../services/usuario.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';

@Component({
  selector: 'app-listado-tickets-usuario',
  templateUrl: './listado-tickets-usuario.component.html',
  styleUrls: ['./listado-tickets-usuario.component.scss']
})
export class ListadoTicketsUsuarioComponent implements OnInit {

  listaTickets: Ticket[];
  nombresDeColumnas: string[] = ['Email','Tipo Ticket','Mensaje','Fecha creacion', 'Estado','Function1'];
  rolUsuarioLogeado;
  idUsuarioLogeado;
  usuarioLogeado: Usuario;


  constructor(private ticketService: TicketService, private usuarioService: UsuarioService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
      this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
      if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1) ){
      this.router.navigate(['/']);
      }

      this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
      if(this.idUsuarioLogeado != null){
        this.usuarioService.getUsuario(this.idUsuarioLogeado.id).subscribe(datos => {
          this.usuarioLogeado = datos;
        })
      }

    this.obtenerTickets();
  }

  obtenerTickets(){
    this.ticketService.getTicketId(this.idUsuarioLogeado.id).subscribe(data => {
      this.listaTickets = data;
    });
  }

  modificarTicket(id: number){
    var idTicket = JSON.stringify({"id" : id});
    sessionStorage.setItem("idTicket",idTicket);
    this.router.navigate(['/tickets/modificar']);
  }

  eliminarTicket(id: number){
    this.ticketService.eliminarTicket(id).subscribe(mensaje =>{
      if(mensaje["result"] == "error"){
        this.dialogService.abrirDialogError('No ha sido posible eliminar el ticket');
      }
      if(mensaje["result"] == "exito"){
        this.dialogService.abrirDialogInfo('Ticket eliminado correctamente');
      }
      this.reloadCurrentRoute();
    })
  }

  volverATickets(){
    this.router.navigate(['/tickets']);
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
