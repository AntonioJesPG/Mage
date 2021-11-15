import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogTypes } from '../components/dialog/dialog-data-type';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class DialogService {

  dialogConfig = new MatDialogConfig();

  constructor(private dialog: MatDialog) {
      this.dialogConfig.disableClose = true; 
      this.dialogConfig.autoFocus = true;
     }

     //Este dialog nos informa cuando sucede un error
     abrirDialogError(textoDeError: string) {
      this.cerrarDialogo(); // Cierro el diálogo, si se está mostrando
      this.dialogConfig.data = {
        tipoDialogo: DialogTypes.ERROR, // Configuro un tipo de error, creado por mí
        texto: textoDeError 
      };
      this.dialog.open(DialogComponent, this.dialogConfig); // abro el diálogo
    }

    //Este dialog es plenamente informativo
    abrirDialogInfo(textoDeInfo: string): Observable<number> {
      this.cerrarDialogo();
      this.dialogConfig.data = {  
        tipoDialogo: DialogTypes.INFORMACION,
        texto: textoDeInfo
      };
      // Abro el diálogo pero obtengo una referencia al mismo.
      const dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
      // Devuelvo el evento "afterClosed", que permite subscripción
      return dialogRef.afterClosed();
    }

    //Dialog para imitar descarga de un producto
    abrirDialogDescarga(textoDeInfo: string): Observable<number> {
      this.cerrarDialogo();
      this.dialogConfig.data = {  
        tipoDialogo: DialogTypes.DESCARGA,
        texto: textoDeInfo
      };
      // Abro el diálogo pero obtengo una referencia al mismo.
      const dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
      // Devuelvo el evento "afterClosed", que permite subscripción
      return dialogRef.afterClosed();
    }

    //Este dialog permite visualizar el video de un producto en la parte de gesión de productos
    abrirDialogVideo(textoDeVideo: string): Observable<number> {
      this.cerrarDialogo();
      this.dialogConfig.data = {  
        tipoDialogo: DialogTypes.VIDEO,
        texto: textoDeVideo
      };
      // Abro el diálogo pero obtengo una referencia al mismo.
      const dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
      // Devuelvo el evento "afterClosed", que permite subscripción
      return dialogRef.afterClosed();
    }

    //Este dialog nos permite ampliar el crud de gestión de productos para poder ver la descripción de los productos
    abrirDialogProd_Desc(texto: string): Observable<number> {
      this.cerrarDialogo();
      this.dialogConfig.data = {  
        tipoDialogo: DialogTypes.PRODUCTO_DESC,
        texto: texto
      };
      // Abro el diálogo pero obtengo una referencia al mismo.
      const dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
      // Devuelvo el evento "afterClosed", que permite subscripción
      return dialogRef.afterClosed();
    }

    //Este dialog nos permite obtener un desglose de cada pedido del ususario
    abrirDialogTabla(texto: string): Observable<number> {
      this.cerrarDialogo();
      this.dialogConfig.data = {  
        tipoDialogo: DialogTypes.PEDIDO_TABLA,
        texto: texto
      };
      // Abro el diálogo pero obtengo una referencia al mismo.
      const dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
      // Devuelvo el evento "afterClosed", que permite subscripción
      return dialogRef.afterClosed();
    }

    cerrarDialogo() {
      this.dialog.closeAll();
    }
}

