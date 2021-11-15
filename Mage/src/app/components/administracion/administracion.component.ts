import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {


  rolUsuarioLogeado;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4 ) ){
      this.router.navigate(['/']);
    }
  }

  gestionUsuarios(){
    this.router.navigate(['/gestion/usuarios']);
  }

  gestionProductos(){
    this.router.navigate(['/gestion/productos']);
  }

  gestionComentarios(){
    this.router.navigate(['/gestion/comentarios']);
  }

  gestionTickets(){
    this.router.navigate(['/asistencia']);
  }

}
