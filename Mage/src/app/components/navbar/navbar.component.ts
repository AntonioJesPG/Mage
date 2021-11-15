import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  usuarioLogeado: Usuario;
  idUsuarioLogeado;
  rolUsuarioLogeado;
  cantidadCestaUsuario;
  menuOculto = true;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.cambiarUsuarioLogeado.subscribe(nuevoUsuarioLogeado => {
      this.usuarioLogeado = nuevoUsuarioLogeado;
    });

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
    if(this.idUsuarioLogeado != null){
      this.usuarioService.getUsuario(this.idUsuarioLogeado.id).subscribe(datos => {
        this.usuarioLogeado = datos;
      });
    }

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.idUsuarioLogeado != null && this.rolUsuarioLogeado.rol == 1) {
      this.contarCestaUsuario();
    }
  }

  irALogin(){
    this.router.navigate(['login']);
  }

  contarCestaUsuario(){
    this.usuarioService.contarCesta(this.idUsuarioLogeado.id).subscribe(dato => {
      this.cantidadCestaUsuario = dato["productos"];
    });
  }

  cerrarSesion(){
    sessionStorage.removeItem("idUsuarioLogeado");
    sessionStorage.removeItem("rolUsuarioLogeado");
    this.usuarioLogeado = null;
    this.idUsuarioLogeado = null;
    this.router.navigate(['login']);
  }

  irAIndex(){
    this.router.navigate(['/']);
  }

  buscarProducto(){
    var inputValue = (<HTMLInputElement>document.getElementById("q")).value;
    var busqueda = JSON.stringify({"nombre" : inputValue});
    sessionStorage.setItem("busqueda",busqueda);
    this.router.navigate(['/reload']);
  }

  irACatalogo(){
    this.router.navigate(['/catalogo']);
  }

  irACesta(){
    this.router.navigate(['/cesta']);
  }

  irAPerfil(){
    this.router.navigate(['/perfil']);
  }

  irAHistorial(){
    this.router.navigate(['/historial']);
  }

  irATickets(){
    this.router.navigate(['/tickets']);
  }

  irAsistencia(){
    this.router.navigate(['/asistencia']);
  }

  irGestion(){
    this.router.navigate(['/gestion']);
  }

  ocultarMenu(){
    console.log("pulsado");
    if(this.menuOculto == true){
      this.menuOculto = false;
      //document.getElementById("content-row-func").style.display = "inline-block";
    }else{
      this.menuOculto = true;
    }
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
