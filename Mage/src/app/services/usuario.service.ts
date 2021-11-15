import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt, Rol, Usuario, Cesta, LineaPedido, Pedido, Producto } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioLogeado: Usuario;

  @Output()
  cambiarUsuarioLogeado = new EventEmitter<Usuario>();

  constructor(private http: HttpClient) { }

  //Solicita al servidor el login del usuario
  autenticaUsuario(email: string, password: string) : Observable<DatosConJwt>{
    var jsonObject = {
      email: email,
      password: password
    };

    return this.http.post<DatosConJwt>('/usuario/autentica', jsonObject).pipe();
  
  }

  //Obtenemos un usuario por su id
  getUsuario(id: number){
    return this.http.get<Usuario>('/usuario/obtenerUsuario?id=' + id).pipe();
  }

  //Obtenemos el usuario que esta autenticado
  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<Usuario>('/usuario/obtenerLogeado')
      .pipe(
        tap(usuarioAutenticado => {
          if ((this.usuarioLogeado == null && usuarioAutenticado != null) ||
            (this.usuarioLogeado != null && usuarioAutenticado == null) ||
            (this.usuarioLogeado != null && usuarioAutenticado != null && this.usuarioLogeado.id != usuarioAutenticado.id)) {
            this.emitirNuevoCambioEnUsuarioAutenticado();
            this.usuarioLogeado = usuarioAutenticado;

            var idUsu = JSON.stringify({"id" : usuarioAutenticado.id});
            var rolUsu = JSON.stringify({"rol" : usuarioAutenticado.id_rol});
            sessionStorage.setItem("idUsuarioLogeado",idUsu);
            sessionStorage.setItem("rolUsuarioLogeado",rolUsu);
          }
        })
      );
  }

  //Emite un cambio de usuario
  emitirNuevoCambioEnUsuarioAutenticado() {
    this.getUsuarioAutenticado().subscribe(usuarioAutenticado => {
      this.cambiarUsuarioLogeado.emit(usuarioAutenticado);
    });
  }

  //Obtiene los roles de un usuario
  getRoles(){
    return this.http.get<Rol[]>('/usuario/obtenerRoles').pipe();
  }

  //Manda la informacion del usuario al servidor para poder registrarlo como usuario basico en el sistema
  registroUsuario(email: String, password: String, username: String, nombre: String, primer_apellido: String, segundo_apellido: String, dni: String){

    var usuario = {
      email : email,
      password : password,
      username: username,
      nombre : nombre,
      primer_apellido : primer_apellido,
      segundo_apellido : segundo_apellido,
      dni : dni
    };

    return this.http.post<String>('/usuario/crearUsuarioNormal',usuario);

  }

  //Igual que el registro normal de usuario pero asignando un rol
  registroUsuarioRol(email: String, password: String, username: String, nombre: String, primer_apellido: String, segundo_apellido: String, dni: String, id_rol: number){

    var usuario = {
      email : email,
      password : password,
      username: username,
      nombre : nombre,
      primer_apellido : primer_apellido,
      segundo_apellido : segundo_apellido,
      dni : dni,
      id_rol : id_rol
    };

    return this.http.post<String>('/usuario/crearUsuarioRoles',usuario);

  }

  //Modifica el usuario con los datos del formulario
  modificarUsuario(id:number, username: String, dni: String, nombre: String, primer_apellido: String, segundo_apellido: String, id_rol: number){

    var usuario = {
      id: id,
      username: username,
      nombre : nombre,
      primer_apellido : primer_apellido,
      segundo_apellido : segundo_apellido,
      dni : dni,
      id_rol : id_rol,
    };

    return this.http.post<String>('/usuario/modificarUsuario',usuario);

  }

    //Modifica el usuario desde el perfil del mismo
    modificarUsuarioNormal(id:number, username: String, nombre: String, primer_apellido: String, segundo_apellido: String){

      var usuario = {
        id: id,
        username: username,
        nombre : nombre,
        primer_apellido : primer_apellido,
        segundo_apellido : segundo_apellido,
        dni : null,
        id_rol : null,
      };
  
      return this.http.post<String>('/usuario/modificarUsuarioNormal',usuario);
  
    }

  //Obtiene un listado de todos los usuarios
  getUsuarios(){
    return this.http.get<Usuario[]>('/usuario/obtenerUsuarios').pipe(
      tap(datos => {
      })
    );
  }

  //Elimina un usuario del sistema
  eliminarUsuario(id : number){
    return this.http.get<String>('/usuario/eliminar?idUsuario=' +id);
  }

  //Nos devuelve la cantidad de productos que hay en la cesta del usuario
  contarCesta(id : number){
    return this.http.get<String>('/cesta/contador?id='+id).pipe(
      tap(datos => {
      })
    );
  }

  //Nos devuelve la cesta del usuario indicado por id_usuario
  getCestaUsuario(id_usuario:number){
    return this.http.get<Cesta[]>('/cesta/obtenerCesta?id_usuario=' + id_usuario).pipe();
  }

  //Nos devuelve el historial de pedidos del usuario indicado por id_usuario
  getHistorialUsuario(id_usuario:number){
    return this.http.get<Pedido[]>('/pedido/obtenerPedidos?id_usuario=' + id_usuario).pipe();
  }

  //Nos devuelve una linea del pedido (producto concreto)
  getLineaPedido(codigo: string){
    return this.http.get<LineaPedido[]>('/pedido/obtenerPedidosCodigo?codigo=' + codigo).pipe();
  }

  //Vacia la cesta del usuario
  vaciarCestaUsuario(id_usuario:number){
    return this.http.get<String>('/cesta/vaciarCesta?id_usuario=' + id_usuario).pipe();
  }

  //Elimina el producto indicado en id_producto de la cesta del usuario identificado por id_usuario
  eliminarProductoCesta(id_producto:number,id_usuario:number){
    var p = {
      id_producto: id_producto,
      id_usuario: id_usuario,

    };
    return this.http.post<String>('/cesta/eliminarProductoCesta', p).pipe();
  }

  obtenerComprados(idUsuario: number){
    return this.http.get<Producto[]>('/pedido/obtenerComprados?id_usuario=' + idUsuario).pipe();
  }


}
