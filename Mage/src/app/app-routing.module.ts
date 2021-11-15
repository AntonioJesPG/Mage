import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { GestionUsuarioComponent } from './components/administracion/cruds/gestion-usuario/gestion-usuario.component';
import { GestionProductosComponent } from './components/administracion/cruds/gestion-productos/gestion-productos.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { TicketsUsuarioComponent } from './components/tickets-usuario/tickets-usuario.component';
import { GestionComentariosComponent } from './components/administracion/cruds/gestion-comentarios/gestion-comentarios.component';
import { TicketsResueltosComponent } from './components/asistencia/cruds/tickets-resueltos/tickets-resueltos.component';
import { TicketsCuentaComponent } from './components/asistencia/cruds/tickets-cuenta/tickets-cuenta.component';
import { TicketsPagosComponent } from './components/asistencia/cruds/tickets-pagos/tickets-pagos.component';
import { TicketsProductosComponent } from './components/asistencia/cruds/tickets-productos/tickets-productos.component';
import { ListadoTicketsUsuarioComponent } from './components/tickets-usuario/crud/listado-tickets-usuario/listado-tickets-usuario.component';
import { CrearTicketComponent } from './components/tickets-usuario/form/crear-ticket/crear-ticket.component';
import { ModificarTicketComponent } from './components/tickets-usuario/form/modificar-ticket/modificar-ticket.component';
import { ModificarComentarioComponent } from './components/administracion/forms/forms-comentarios/modificar-comentario/modificar-comentario.component';
import { CrearUsuarioComponent } from './components/administracion/forms/forms-usuarios/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './components/administracion/forms/forms-usuarios/modificar-usuario/modificar-usuario.component';
import { CrearProductoComponent } from './components/administracion/forms/forms-productos/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './components/administracion/forms/forms-productos/modificar-producto/modificar-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CestaComponent } from './components/cesta/cesta.component';
import { HistorialComponent } from './components/historial/historial.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ReloaderComponent } from './components/busqueda/reloader/reloader.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'cesta', component: CestaComponent},
  {path: 'pagar', component: PagosComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'buscar', component: BusquedaComponent},
  {path: 'reload', component: ReloaderComponent},
  {path: 'historial', component: HistorialComponent},
  {path: 'asistencia', component: AsistenciaComponent},
  {path: 'gestion', component: AdministracionComponent},
  {path: 'tickets', component: TicketsUsuarioComponent},
  {path: 'tickets/misTickets', component: ListadoTicketsUsuarioComponent},
  {path: 'tickets/crear', component: CrearTicketComponent},
  {path: 'tickets/modificar', component: ModificarTicketComponent},
  {path: 'saldo', component: SaldoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'gestion/usuarios' , component: GestionUsuarioComponent},
  {path: 'gestion/usuarios/crear' , component: CrearUsuarioComponent},
  {path: 'gestion/usuarios/modificar' , component: ModificarUsuarioComponent},
  {path: 'gestion/productos' , component: GestionProductosComponent},
  {path: 'gestion/productos/crear' , component: CrearProductoComponent},
  {path: 'gestion/productos/modificar' , component: ModificarProductoComponent},
  {path: 'gestion/comentarios' , component: GestionComentariosComponent},
  {path: 'gestion/comentarios/modificar' , component: ModificarComentarioComponent},
  {path: 'asistencia/cuenta' , component: TicketsCuentaComponent},
  {path: 'asistencia/pagos' , component: TicketsPagosComponent},
  {path: 'asistencia/productos' , component: TicketsProductosComponent},
  {path: 'asistencia/resueltos' , component: TicketsResueltosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
