import { Component, OnInit } from '@angular/core';
import {Ticket} from 'src/app/interfaces/interfaces';
import {TicketService} from '../../../../services/ticket.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';

@Component({
  selector: 'app-tickets-cuenta',
  templateUrl: './tickets-cuenta.component.html',
  styleUrls: ['./tickets-cuenta.component.scss']
})
export class TicketsCuentaComponent implements OnInit {
  listaTickets: Ticket[];
  nombresDeColumnas: string[] = ['Email','Mensaje','Fecha creacion','Funcion1'];
  rolUsuarioLogeado;

  constructor(private ticketService: TicketService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol == 1 ) ){
      this.router.navigate(['/']);
    }
    this.obtenerTickets();
  }

  obtenerTickets(){
    this.ticketService.getTicketCategoria(1).subscribe(data => {
      this.listaTickets = data;
      console.log(data);
    });
  }

  resolverTicket(id: number){
    this.ticketService.resolverTicket(id).subscribe(mensaje =>{
      if(mensaje["result"] == "error"){
        this.dialogService.abrirDialogError('No ha sido posible resolver el ticket');
      }
      if(mensaje["result"] == "exito"){
        this.dialogService.abrirDialogInfo('Ticket resuelto correctamente');
      }
      this.reloadCurrentRoute();
    })
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

  volverAAsistencia(){
    this.router.navigate(['/asistencia']);
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
