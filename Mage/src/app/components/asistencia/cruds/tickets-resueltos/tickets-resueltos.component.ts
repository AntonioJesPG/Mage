import { Component, OnInit } from '@angular/core';
import {Ticket} from 'src/app/interfaces/interfaces';
import {TicketService} from '../../../../services/ticket.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';

@Component({
  selector: 'app-tickets-resueltos',
  templateUrl: './tickets-resueltos.component.html',
  styleUrls: ['./tickets-resueltos.component.scss']
})
export class TicketsResueltosComponent implements OnInit {

  listaTickets: Ticket[];
  nombresDeColumnas: string[] = ['Email','Tipo Ticket','Mensaje','Fecha creacion'];
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
    this.ticketService.getTicketsResueltos().subscribe(data => {
      this.listaTickets = data;
      console.log(data);
    });
  }

  volverAAsistencia(){
    this.router.navigate(['/asistencia']);
  }

}
