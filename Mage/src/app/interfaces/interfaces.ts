import { DateAdapter } from "@angular/material/core";

export interface Interfaces {
}

export interface DatosConJwt{
    jwt: string;
}

export interface Usuario {
    id: number;
    email: string;
    password: string;
    username: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    id_rol: number;
    nombre_rol : string;
    dni: string;
    saldo: string;
    imagen: string;
}

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    video: string;
    fecha_salida: Date;
    desarrolladora: string;
    descuento: number;
    activo: boolean;
    img:  string;
}

export interface Comentario {
    id: number;
    id_usuario: number;
    id_producto: number;
    username: string;
    nombre_producto: string;
    mensaje: string;
    valoracion: boolean;
    fecha_creacion: Date;
}

export interface Ticket {
    id: number;
    id_usuario: number;
    email: string;
    tipo_ticket: string;
    mensaje: string;
    estado: boolean;
    fecha_creacion: Date;
}

export interface CategoriaTicket {
    id: number;
    descripcion: string;
}

export interface CategoriaProducto {
    id: number;
    descripcion: string;
}

export interface Rol {
    id: number;
    descripcion: string;
}

export interface Imagen{
    img: string;

}

export interface Requisitos{
    so: string;
    procesador: string;
    memoria: string;
    gpu: string;
    almacenamiento: string;
}

export interface Cesta {
    id: number,
    id_usuario: number,
    id_producto: number,
    nombre_producto: string,
    img: string,
    precio: number
}

export interface Pedido{
    id: number,
    id_usuario: number,
    codigo: string,
    fecha: Date,
    precio_total: number
}

export interface LineaPedido{
    img: string,
    nombre_producto: string,
    precio_compra: number
}
