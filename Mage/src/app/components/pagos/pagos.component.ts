import { Component, OnInit } from '@angular/core';
import { render} from 'creditcardpayments/creditCardPayments';
import {ProductoService} from '../../services/producto.service';
import {DialogService} from '../../services/dialog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  rolUsuarioLogeado;
  idUsuarioLogeado;
  precioCesta;

  constructor(private productoService: ProductoService, private dialogService : DialogService, private router: Router) {

   }

  ngOnInit(): void {

    this.rolUsuarioLogeado = JSON.parse(sessionStorage.getItem("rolUsuarioLogeado"));
    if(this.rolUsuarioLogeado == null || (this.rolUsuarioLogeado.rol != 1 ) ){
      this.router.navigate(['/']);
    }

    this.idUsuarioLogeado = JSON.parse(sessionStorage.getItem("idUsuarioLogeado"));

    this.precioCesta = JSON.parse(sessionStorage.getItem("precioCesta"));
    if(this.precioCesta == null){
      this.router.navigate(['/']);
    }

    render({
      id: "#myPaypalButtons",
      currency: "EUR",
      value: this.precioCesta.total,
      onApprove: (details) => {
          this.pagarProductos();
      }
    });
  }

  pagarProductos(){
    sessionStorage.removeItem("precioCesta");
    this.productoService.comprarCesta(this.idUsuarioLogeado.id).subscribe(data => {
      if(data["resultado"] == "correcto"){
        this.dialogService.abrirDialogInfo('Compra completada');
        this.router.navigate(['/historial']);
      }else{
        this.dialogService.abrirDialogError('No ha sido posible completar la compra');
        this.router.navigate(['/cesta']);
      }
    });
  }

  volverACesta(){
    this.router.navigate(['/cesta']);
  }

}
