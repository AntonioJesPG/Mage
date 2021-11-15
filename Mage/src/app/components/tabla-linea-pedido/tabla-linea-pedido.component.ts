import { Component,Input, OnInit } from '@angular/core';
import {LineaPedido} from 'src/app/interfaces/interfaces';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-tabla-linea-pedido',
  templateUrl: './tabla-linea-pedido.component.html',
  styleUrls: ['./tabla-linea-pedido.component.scss']
})
export class TablaLineaPedidoComponent implements OnInit {

  @Input('codigo') codigo: string;

  nombresDeColumnas: string[] = ['Imagen','Nombre','Precio'];
  listaPedido : LineaPedido[];

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {

    this.obtenerListaPedido(this.codigo);
  }

  obtenerListaPedido(codigo: string){
    this.usuarioService.getLineaPedido(codigo).subscribe(data => {
      this.listaPedido = data;
    });
  }

}
