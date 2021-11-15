import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {

  rolUsuarioLogeado;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol == 1 ) ){
      this.router.navigate(['/']);
    }

  }

  asistenciaCuenta(){
    this.router.navigate(['/asistencia/cuenta']);
  }

  asistenciaPagos(){
    this.router.navigate(['/asistencia/pagos']);
  }

  asistenciaProductos(){
    this.router.navigate(['/asistencia/productos']);
  }

  asistenciaResueltos(){
    this.router.navigate(['/asistencia/resueltos']);
  }

}
