import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tickets-usuario',
  templateUrl: './tickets-usuario.component.html',
  styleUrls: ['./tickets-usuario.component.scss']
})
export class TicketsUsuarioComponent implements OnInit {

  constructor( private router: Router) { }

  rolUsuarioLogeado;

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1) ){
      this.router.navigate(['/']);
    }
  }

  irAListado(){
    this.router.navigate(['tickets/misTickets']);
  }

  crearTicket(){
    this.router.navigate(['/tickets/crear']);
  }


}
