export interface DialogDataType{
    tipoDialogo: number,
    texto: string
}

export class DialogTypes{
    public static readonly ERROR = 1;
    public static readonly INFORMACION = 2;
    public static readonly VIDEO = 3;
    public static readonly PRODUCTO_DESC = 4;
    public static readonly PEDIDO_TABLA = 5;
    public static readonly DESCARGA = 6;

    public static readonly RESPUESTA_CANCELAR = 0;
    public static readonly RESPUESTA_ACEPTAR = 1;
}