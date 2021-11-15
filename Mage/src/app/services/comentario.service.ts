import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Comentario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  //Obtiene el listado con todos los comentarios
  getComentarios(){
    return this.http.get<Comentario[]>('/comentarios/obtenerComentarios').pipe(
      tap(datos => {
        console.log(datos);
      })
    );
  }

  //Obtiene un listado con todos los comentarios del producto indicado en id_producto
  getComentariosProducto(id: number){
    return this.http.get<Comentario[]>('/comentarios/obtenerComentariosProducto?idProducto=' + id).pipe(
      tap(datos => {
        console.log(datos);
      })
    );
  }

  //Obtiene el comentario identificado por la id proporcionada
  obtenerComentario(id : number){
    return this.http.get<Comentario>('/comentarios/obtenerComentarioId?id=' + id).pipe(
      tap(datos => {
      })
    );
  }

  //Obtiene los comentarios del usuario identificado por id_usuario para el producto con id_producto
  obtenerComentarioUsuario(id_producto : number, id_usuario: number){
    var datos = {
      id_producto : id_producto,
      id_usuario : id_usuario
    };
    
    return this.http.post<Comentario>('/comentarios/obtenerComentarioIdUsuario', datos).pipe();
  }

  //modifica el comentario identificado por id
  modificarComentario(id : number, mensaje: string){
    var comentario = {
      id : id,
      mensaje : mensaje
    }

    return this.http.post<String>('/comentarios/modificarComentario',comentario);
  }

  //Crea el comentario con los siguientes datos
  comentar(id_producto : number, id_usuario: number, mensaje: string, valoracion : number){
    var comentario = {
      id_producto : id_producto,
      id_usuario : id_usuario,
      mensaje : mensaje,
      valoracion : valoracion
    }

    return this.http.post<String>('/comentarios/comentar',comentario);
  }

  //Modifica el comentario identificado por la id
  modificarComentarioUsuario(id : number, mensaje: string, valoracion : number){
    var comentario = {
      id : id,
      mensaje : mensaje,
      valoracion : valoracion
    }

    return this.http.post<String>('/comentarios/modificarComentarioUsuario',comentario);
  }

  //Elimina el comentario identificado con la id proporcionada
  eliminarComentario(id : number){
    return this.http.get<String>('/comentarios/eliminar?idComentario=' +id);
  }
}
