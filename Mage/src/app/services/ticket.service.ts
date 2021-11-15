import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ticket } from '../interfaces/interfaces';
import { CategoriaTicket } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  //Obtiene un listado de todos los tickets con status = resuelto
  getTicketsResueltos(){
    return this.http.get<Ticket[]>('/tickets/obtenerResueltos').pipe(
      tap(datos => {
        console.log(datos);
      })
    );
  }

  //Obtiene los tickets cuya categoria coincide con la indicada
  getTicketCategoria(idCategoria : number){
    return this.http.get<Ticket[]>('/tickets/obtenerCategoria?idCategoria=' + idCategoria).pipe(
      tap(datos => {
        console.log(datos);
      })
    );
  }

  //Obtiene los tickets que ha creado el usuario identificado por id_usuario
  getTicketId(idUsuario : number){
    return this.http.get<Ticket[]>('/tickets/obtenerPorUsuario?idUsuario=' + idUsuario).pipe(
      tap(datos => {
        console.log(datos);
      })
    );
  }

  //Marca un ticket con el status = resuelto
  resolverTicket(id : number){
    return this.http.get<String>('/tickets/resolver?idTicket=' +id);
  }

  //Elimina un ticket (Solo posible con los que no estan resueltos)
  eliminarTicket(id : number){
    return this.http.get<String>('/tickets/eliminar?idTicket=' +id);
  }

  //Obtiene un listado de las categorias de ticket
  getCategorias(){
    return this.http.get<CategoriaTicket[]>('/tickets/obtenerCategorias').pipe(
      tap(datos => {
        console.log(datos);
      })
    )
  }

  //Crea un ticket para el usuario identificado por id_usuario
  crearTicket(id_usuario: number, mensaje: String,  id_ticket: number){

    var ticket = {
      id_usuario : id_usuario,
      id_ticket : id_ticket,
      mensaje : mensaje
    }

    return this.http.post<String>('/tickets/crearTicket',ticket);

  }

  //Modifica el mensaje del ticket con la id indicada
  modificarTicket(id: number, mensaje: String){

    var ticket = {
      id : id,
      mensaje : mensaje
    }

    return this.http.post<String>('/tickets/modificarTicket',ticket);

  }

  //Obtiene el ticket identificado por el id indicado
  obtenerTicket(id:number){
    return this.http.get<Ticket>('/tickets/obtenerTicket?id=' + id).pipe(
      tap(datos => {
      })
    );
  }

}
