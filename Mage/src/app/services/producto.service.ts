import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoriaProducto, Imagen, Producto, Requisitos, Cesta } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  //Devuelve el listado con los productos destacados
  getListaDestacados(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/destacados').pipe();
  }

  //Devuelve el catalogo completo de productos (que se encuentran con status activo)
  getCatalogo(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/catalogo').pipe();
  }

  //Devuelve los 4 productos con mayor descuento
  getGrandesOfertas(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/grandesDescuentos').pipe();
  }

  //Devuelve los ultimos productos que se han registrado en el sistema
  getNuevos(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/nuevos').pipe();
  }

  //Devuelve una lista de productos cuyo precio es menor a 20 euros
  getMenos20(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/menos20').pipe();
  }

  //Devuelve una lista de productos cuyo precio es menor a 10 euros
  getMenos10(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/menos10').pipe();
  }

  //Obtiene el primer producto destacado
  getPrimerDestacado(): Observable<Producto>{
    return this.http.get<Producto>('/producto/obtenerPrimerDestacado').pipe();
  }

  //Obtiene una lista con todos los productos que tienen descuento
  getListaDescuentos(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/descuentos').pipe();
  }

  //Obtiene una lista con los nuevos productos
  getListaNuevos(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/nuevos').pipe();
  }

  //Obtiene un listado de todos los productos
  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/producto/obtenerLista').pipe();
  }

  //Obtiene el producto con la id indicada
  getProducto(id: number){
    return this.http.get<Producto>('/producto/obtenerProducto?id=' + id).pipe();
  }

  //Modifica el producto con la id indicada
  getProductoModificar(id: number){
    return this.http.get<Producto>('/producto/obtenerProductoModificar?id=' + id).pipe();
  }

  //Obtiene la categoria del producto con la id indicada
  getCategoria(id:number){
    return this.http.get<CategoriaProducto>('/producto/obtenerCategoria?id=' + id).pipe();
  }

  //Obtiene la imagen del producto con la id indicada
  getImagen(id:number){
    return this.http.get<Imagen>('/producto/obtenerImagen?id_producto=' + id).pipe();
  }

  //Obtiene los requisitos minimos para el producto con la id indicada
  getRequisitosMin(id:number){
    return this.http.get<Requisitos>('/producto/obtenerRequisitosMin?id_producto=' + id).pipe();
  }

  //Obtiene los requisitos recomendados para el producto con la id indicada
  getRequisitosRec(id:number){
    return this.http.get<Requisitos>('/producto/obtenerRequisitosRec?id_producto=' + id).pipe();
  }

  //Desactiva un producto con la id indicada
  desactivarProducto(id:number){
    return this.http.get<String>('/producto/desactivar?idProducto=' +id);
  }

  //Activa un producto con la id_indicada
  activarProducto(id:number){
    return this.http.get<String>('/producto/activar?idProducto=' +id);
  }

  //Modifica el producto con los datos que se proporcionan
  modificarProducto(id:number, producto: Producto, categoria: string, req_min: Requisitos, req_rec: Requisitos, imagen: Imagen){
    var p = {
      id : id,
      nombre : producto.nombre,
      precio : producto.precio,
      descripcion : producto.descripcion,
      video : producto.video,
      fecha_salida : producto.fecha_salida,
      desarrolladora : producto.desarrolladora,
      descuento: producto.descuento,
      id_categoria : categoria,
      imagen : imagen.img,
      so_min : req_min.so,
      procesador_min : req_min.procesador,
      memoria_min : req_min.memoria,
      gpu_min : req_min.gpu,
      almacenamiento_min : req_min.almacenamiento,
      so_rec : req_rec.so,
      procesador_rec : req_rec.procesador,
      memoria_rec : req_rec.memoria,
      gpu_rec : req_rec.gpu,
      almacenamiento_rec : req_rec.almacenamiento
    };

    return this.http.post<String>('/producto/modificar',p).pipe(
      tap(datos => {
        console.log(datos);
      })
    )
  }

  //Comprueba si el producto con la id_producto indicada se encuentra en los pedidos del usuario indicado
  comprobarProductoComprado(id_producto: number, id_usuario:number){
    var datos = {
      id_producto : id_producto,
      id_usuario : id_usuario
    };

    return this.http.post<String>('/producto/comprobarComprado',datos).pipe();

  }

  //Comprueba si el producto con la id_producto indicada se encuentra en la cesta del usuario indicado
  comprobarProductoEnCesta(id_producto: number, id_usuario:number){
    var datos = {
      id_producto : id_producto,
      id_usuario : id_usuario
    };

    return this.http.post<String>('/cesta/comprobarCesta',datos).pipe();

  }

  //Crea un producto con los datos indicados
  crearProducto(producto: Producto, categoria: string, req_min: Requisitos, req_rec: Requisitos, imagen: Imagen){

    var p = {
      nombre : producto.nombre,
      precio : producto.precio,
      descripcion : producto.descripcion,
      video : producto.video,
      fecha_salida : producto.fecha_salida,
      desarrolladora : producto.desarrolladora,
      id_categoria : categoria,
      imagen : imagen.img,
      so_min : req_min.so,
      procesador_min : req_min.procesador,
      memoria_min : req_min.memoria,
      gpu_min : req_min.gpu,
      almacenamiento_min : req_min.memoria,
      so_rec : req_rec.so,
      procesador_rec : req_rec.procesador,
      memoria_rec : req_rec.memoria,
      gpu_rec : req_rec.gpu,
      almacenamiento_rec : req_rec.memoria
    };

    return this.http.post<String>('/producto/crear',p).pipe(
      tap(datos => {
        console.log(datos);
      })
    )
  }
  

  getCategorias(){
    return this.http.get<CategoriaProducto[]>('/producto/obtenerCategorias').pipe(
      tap(datos => {
      })
    )
  }

  agregarACesta(id_producto:number, id_usuario:number){
    var datos = {
      id_producto : id_producto,
      id_usuario : id_usuario
    };

    console.log(datos);
    return this.http.post<String>('/cesta/agregarProducto',datos).pipe();
  }

  comprarCesta(id: number){
    return this.http.get<String>('/cesta/comprar?idUsuario=' + id).pipe();
  }

  buscarProductos(nombre: string){
    return this.http.get<Producto[]>('/producto/buscar?nombre=' + nombre).pipe();
  }
}
