import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Producto, Imagen, Requisitos} from 'src/app/interfaces/interfaces';
import {CategoriaProducto} from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../../../../services/producto.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../../services/dialog.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.scss']
})
export class ModificarProductoComponent implements OnInit {

  producto: Producto;
  Requisitos_min: Requisitos;
  Requisitos_rec: Requisitos;
  imagen: Imagen;
  formDatosProducto: FormGroup;
  formRequisitos: FormGroup;
  formImagenes: FormGroup;
  isEditable = false;
  categorias : CategoriaProducto[];
  categoria : CategoriaProducto;
  idProductoAModificar;
  rolUsuarioLogeado;

  constructor(private _formBuilder: FormBuilder, private productoService: ProductoService, private router: Router, private dialogService: DialogService) {}

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 3 && this.rolUsuarioLogeado.rol != 4 ) ){
      this.router.navigate(['/']);
    }

    this.imagen = {
      img : null
    }

    this.idProductoAModificar = JSON.parse(sessionStorage.getItem("idProductoMod"));
    if(this.idProductoAModificar == null){
      this.router.navigate(['gestion/productos']);
    }else{
      this.obtenerDatosProducto(this.idProductoAModificar.id);
      this.obtenerDatosCategoria(this.idProductoAModificar.id);
      this.obtenerDatosRequisitosMinimos(this.idProductoAModificar.id);
      this.obtenerDatosRequisitosRecomendados(this.idProductoAModificar.id);
      this.obtenerDatosImagen(this.idProductoAModificar.id);
    }

    this.formDatosProducto = this._formBuilder.group({
      nombre: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      precio:  new FormControl('',[Validators.required]),
      descripcion:  new FormControl('',[Validators.required,   Validators.maxLength(2000)]),
      video:  new FormControl('',[Validators.required,   Validators.maxLength(500)]),
      fecha_salida:  new FormControl('',[Validators.required]),
      desarrolladora:  new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      descuento:  new FormControl('',[Validators.required]),
      categoria:  new FormControl('',[Validators.required])
    });
    this.formRequisitos = this._formBuilder.group({
      so_min: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      procesador_min: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      memoria_min: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      gpu_min: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      almacenamiento_min: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      so_max: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      procesador_max: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      memoria_max: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      gpu_max: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      almacenamiento_max: new FormControl('',[Validators.required,   Validators.maxLength(250)])
    });
    this.formImagenes = this._formBuilder.group({
      imagen: new FormControl()
    });

    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.productoService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  volverProductos(){
    this.router.navigate(['/gestion/productos']);
  }

  modificarProducto(){
    this.producto = {
      id : null,
      nombre : this.formDatosProducto.controls.nombre.value,
      precio : this.formDatosProducto.controls.precio.value,
      descripcion : this.formDatosProducto.controls.descripcion.value,
      video : this.formDatosProducto.controls.video.value,
      fecha_salida : this.formDatosProducto.controls.fecha_salida.value,
      desarrolladora : this.formDatosProducto.controls.desarrolladora.value,
      descuento : this.formDatosProducto.controls.descuento.value,
      activo : null,
      img: null
    };

    this.Requisitos_min = {
      so: this.formRequisitos.controls.so_min.value,
      procesador: this.formRequisitos.controls.procesador_min.value,
      memoria: this.formRequisitos.controls.memoria_min.value,
      gpu: this.formRequisitos.controls.gpu_min.value,
      almacenamiento: this.formRequisitos.controls.almacenamiento_min.value,
    }

    this.Requisitos_rec = {
      so: this.formRequisitos.controls.so_max.value,
      procesador: this.formRequisitos.controls.procesador_max.value,
      memoria: this.formRequisitos.controls.memoria_max.value,
      gpu: this.formRequisitos.controls.gpu_max.value,
      almacenamiento: this.formRequisitos.controls.almacenamiento_max.value,
    }

    this.productoService.modificarProducto( this.idProductoAModificar.id ,this.producto, this.formDatosProducto.controls.categoria.value, this.Requisitos_min, this.Requisitos_rec, this.imagen).subscribe(dato => {

        if(dato["result"] == "correcto"){
          this.dialogService.abrirDialogError('Producto modificado correctamente');
          this.router.navigate(['gestion/productos']);
        }
    }) ;
  }

  agregarImagenProducto() {
    
    const inputNode: any = document.querySelector('#file');

    if(typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.readAsArrayBuffer(inputNode.files[0]);

      reader.onload = (e:any) => {
        this.imagen.img = btoa(
          new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

  
  obtenerDatosProducto(id:number){
    this.productoService.getProductoModificar(id).subscribe(data => {
      this.producto = data;
      this.formDatosProducto.controls.nombre.setValue(this.producto.nombre);
      this.formDatosProducto.controls.precio.setValue(this.producto.precio);
      this.formDatosProducto.controls.descripcion.setValue(this.producto.descripcion);
      this.formDatosProducto.controls.video.setValue(this.producto.video);
      this.formDatosProducto.controls.fecha_salida.setValue(this.producto.fecha_salida);
      this.formDatosProducto.controls.desarrolladora.setValue(this.producto.desarrolladora);
      this.formDatosProducto.controls.descuento.setValue(this.producto.descuento);
      console.log(this.producto.desarrolladora);
    });
  }

  obtenerDatosCategoria(id:number){
    this.productoService.getCategoria(id).subscribe(data => {
      this.categoria = data;
      this.formDatosProducto.controls.categoria.setValue(this.categoria.id);
    });
  }

  obtenerDatosImagen(id:number){
    this.productoService.getImagen(id).subscribe(data => {
      if(data["error"] == "no_image"){
        console.log("No hay imagen");
      }else{
        this.imagen = data;
      }
    });
  }

  obtenerDatosRequisitosMinimos(id:number){
    this.productoService.getRequisitosMin(id).subscribe(data => {
      this.Requisitos_min = data;

      this.formRequisitos.controls.so_min.setValue(this.Requisitos_min.so);
      this.formRequisitos.controls.procesador_min.setValue(this.Requisitos_min.procesador);
      this.formRequisitos.controls.memoria_min.setValue(this.Requisitos_min.memoria);
      this.formRequisitos.controls.gpu_min.setValue(this.Requisitos_min.gpu);
      this.formRequisitos.controls.almacenamiento_min.setValue(this.Requisitos_min.almacenamiento);
    });
  }

  obtenerDatosRequisitosRecomendados(id:number){
    this.productoService.getRequisitosRec(id).subscribe(data => {
      this.Requisitos_rec = data;

      this.formRequisitos.controls.so_max.setValue(this.Requisitos_rec.so);
      this.formRequisitos.controls.procesador_max.setValue(this.Requisitos_rec.procesador);
      this.formRequisitos.controls.memoria_max.setValue(this.Requisitos_rec.memoria);
      this.formRequisitos.controls.gpu_max.setValue(this.Requisitos_rec.gpu);
      this.formRequisitos.controls.almacenamiento_max.setValue(this.Requisitos_rec.almacenamiento);
    });
  }

}
