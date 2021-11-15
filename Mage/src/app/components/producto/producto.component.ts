import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {ComentarioService} from '../../services/comentario.service';
import {DialogService} from '../../services/dialog.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaProducto, Imagen, Producto, Requisitos, Comentario, Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  idProducto;
  rolUsuarioLogeado;
  idUsuarioLogeado;
  comprable;
  enCesta = false;

  recomendado: string;
  comentForm: FormGroup;
  producto : Producto;
  requisitos_min : Requisitos;
  requisitos_rec : Requisitos;
  imagen : Imagen;
  categoria : CategoriaProducto;

  comentarioUsuario: Comentario;
  listaComentarios: Comentario[];

  constructor(private dialogService: DialogService, private productoService: ProductoService,private comentarioService: ComentarioService, private router: Router) { }

  ngOnInit(): void {

    this.inicializarElementos();

    this.comentForm = new FormGroup({
      texto: new FormControl('',[Validators.required, Validators.maxLength(250)]),
      options: new FormControl('',[Validators.required])
    });

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1)){
      this.comprable = false;
      //poner false
    }

    this.idProducto = JSON.parse(sessionStorage.getItem("idProducto"));
    if(this.idProducto.id == null){
      this.router.navigate(['/']);
    }else{
      this.obtenerDatosProducto(this.idProducto.id);
      this.obtenerDatosCategoria(this.idProducto.id);
      this.obtenerDatosRequisitosMinimos(this.idProducto.id);
      this.obtenerDatosRequisitosRecomendados(this.idProducto.id);
      this.obtenerDatosImagen(this.idProducto.id);
      this.obtenerDatosComentario(this.idProducto.id);
    }

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));
    if(this.idUsuarioLogeado != null && this.rolUsuarioLogeado.rol == 1){
      this.comprobarProductoComprado(this.idProducto.id,this.idUsuarioLogeado.id);
    }

  }

  inicializarElementos(){
    this.imagen = {
      img : null
    }

    this.comentarioUsuario = {
      id: null,
      id_usuario: null,
      id_producto: null,
      username: null,
      nombre_producto: null,
      mensaje: null,
      valoracion: null,
      fecha_creacion: null
    }

    this.producto = {
      id: null,
      nombre : null,
      precio : null,
      descripcion : null,
      video : null,
      fecha_salida : null,
      desarrolladora : null,
      descuento : null,
      activo : null,
      img : null
    }

    this.categoria = {
      id: null,
      descripcion: null
    }

    this.requisitos_min = {
      so: null,
      procesador: null,
      memoria: null,
      gpu: null,
      almacenamiento: null
    }

    this.requisitos_rec = {
      so: null,
      procesador: null,
      memoria: null,
      gpu: null,
      almacenamiento: null
    }
  }

  obtenerDatosProducto(id:number){
    this.productoService.getProducto(id).subscribe(data => {
      this.producto = data;
    });
  }

  agregarCesta(){
    this.productoService.agregarACesta(this.idProducto.id, this.idUsuarioLogeado.id).subscribe(data => {
      if(data["resultado"] == "correcto"){
        this.dialogService.abrirDialogInfo('El producto se ha agregado a su cesta');
        this.router.navigate(['/cesta']);
      }else{
        this.dialogService.abrirDialogError('No ha sido posible agregar el producto');
      }
    });
  }

  comentar(){
    this.comentarioService.comentar(this.idProducto.id, this.idUsuarioLogeado.id,this.comentForm.controls.texto.value,this.comentForm.controls.options.value).subscribe(dato => {
      if(dato["result"] == "comentario_creado"){
        this.dialogService.abrirDialogInfo('Comentario creado correctamente');
        this.reloadCurrentRoute();
      }else{
        this.dialogService.abrirDialogError('Comentario no creado');
      }
    }) ;
  }

  obtenerDatosComentarioUsuario(id_producto: number, id_usuario: number){
    this.comentarioService.obtenerComentarioUsuario(id_producto, id_usuario).subscribe(data => {
      if(data["id"] != null){
        this.comentarioUsuario = data;
        this.comentForm.controls.texto.setValue(this.comentarioUsuario.mensaje);
        if(this.comentarioUsuario.valoracion == true){
          this.comentForm.controls.options.setValue("1");
        }else{
          this.comentForm.controls.options.setValue("0");
        }
        
      }
    });
  }

  modificarComentario(){
    this.comentarioService.modificarComentarioUsuario(this.comentarioUsuario.id,this.comentForm.controls.texto.value,this.comentForm.controls.options.value).subscribe(dato => {
      if(dato["result"] == "comentario_modificado"){
        this.dialogService.abrirDialogInfo('Comentario modificado correctamente');
        this.reloadCurrentRoute();
      }else{
        this.dialogService.abrirDialogError('Comentario no modificado');
      }
    }) ;
  }

  eliminarComentario(){
    this.comentarioService.eliminarComentario(this.comentarioUsuario.id).subscribe(dato => {
      if(dato["result"] == "comentario_eliminado"){
        this.dialogService.abrirDialogInfo('Comentario eliminado correctamente');
        this.reloadCurrentRoute();
      }else{
        this.dialogService.abrirDialogError('No ha sido posible eliminar el comentario');
      }
    }) ;
  }

  comprobarProductoComprado(id_producto:number, id_usuario:number){
    this.productoService.comprobarProductoComprado(id_producto,id_usuario).subscribe(data => {
      if(data["resultado"] == ["existe"]){
        this.comprable = false;
        this.obtenerDatosComentarioUsuario(this.idProducto.id,this.idUsuarioLogeado.id);
      }else{
        this.comprable = true;
        this.comprobarProductoEnCesta(this.idProducto.id,this.idUsuarioLogeado.id);
      }
    });
  }

  comprobarProductoEnCesta(id_producto:number, id_usuario:number){
    this.productoService.comprobarProductoEnCesta(id_producto,id_usuario).subscribe(data => {
      if(data["resultado"] == ["existe"]){
        this.enCesta = true;
      }else{
        this.enCesta = false;
      }
    })
  }

  obtenerDatosCategoria(id:number){
    this.productoService.getCategoria(id).subscribe(data => {
      this.categoria = data;
    });
  }

  obtenerDatosImagen(id:number){
    this.productoService.getImagen(id).subscribe(data => {
      if(data["error"] == "no_image"){
      }else{
        this.imagen = data;
      }
    });
  }

  obtenerDatosRequisitosMinimos(id:number){
    this.productoService.getRequisitosMin(id).subscribe(data => {
      this.requisitos_min = data;
    });
  }

  obtenerDatosRequisitosRecomendados(id:number){
    this.productoService.getRequisitosRec(id).subscribe(data => {
      this.requisitos_rec = data;

    });
  }

  obtenerDatosComentario(id:number){
    this.comentarioService.getComentariosProducto(id).subscribe(data => {
      this.listaComentarios = data;
    });
  }

  reloadCurrentRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/login',{skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
