import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Producto, Imagen, Requisitos} from 'src/app/interfaces/interfaces';
import {CategoriaProducto} from 'src/app/interfaces/interfaces';
import {ProductoService} from '../../../../../services/producto.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../../../services/dialog.service';



@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

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

    this.formDatosProducto = this._formBuilder.group({
      nombre: new FormControl('',[Validators.required,   Validators.maxLength(250)]),
      precio:  new FormControl('',[Validators.required]),
      descripcion:  new FormControl('',[Validators.required,   Validators.maxLength(2000)]),
      video:  new FormControl('',[Validators.required,   Validators.maxLength(500)]),
      fecha_salida:  new FormControl('',[Validators.required]),
      desarrolladora:  new FormControl('',[Validators.required,   Validators.maxLength(250)]),
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
      imagen: new FormControl('',[Validators.required])
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

  crearProducto(){
    this.producto = {
      id : null,
      nombre : this.formDatosProducto.controls.nombre.value,
      precio : this.formDatosProducto.controls.precio.value,
      descripcion : this.formDatosProducto.controls.descripcion.value,
      video : this.formDatosProducto.controls.video.value,
      fecha_salida : this.formDatosProducto.controls.fecha_salida.value,
      desarrolladora : this.formDatosProducto.controls.desarrolladora.value,
      descuento : null,
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

    console.log(this.categoria);

    this.productoService.crearProducto(this.producto, this.formDatosProducto.controls.categoria.value, this.Requisitos_min, this.Requisitos_rec, this.imagen).subscribe(dato => {

        if(dato["result"] == "correcto"){
          this.dialogService.abrirDialogError('Producto creado correctamente');
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

}
