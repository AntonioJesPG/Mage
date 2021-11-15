import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTable,MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';

import { HomeComponent } from './components/home/home.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { TicketsUsuarioComponent } from './components/tickets-usuario/tickets-usuario.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { RegistroComponent } from './components/registro/registro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { GestionUsuarioComponent } from './components/administracion/cruds/gestion-usuario/gestion-usuario.component';
import { GestionComentariosComponent } from './components/administracion/cruds/gestion-comentarios/gestion-comentarios.component';
import { GestionProductosComponent } from './components/administracion/cruds/gestion-productos/gestion-productos.component';
import { SafePipe } from './safe.pipe';
import { TicketsCuentaComponent } from './components/asistencia/cruds/tickets-cuenta/tickets-cuenta.component';
import { TicketsPagosComponent } from './components/asistencia/cruds/tickets-pagos/tickets-pagos.component';
import { TicketsProductosComponent } from './components/asistencia/cruds/tickets-productos/tickets-productos.component';
import { TicketsResueltosComponent } from './components/asistencia/cruds/tickets-resueltos/tickets-resueltos.component';
import { ListadoTicketsUsuarioComponent } from './components/tickets-usuario/crud/listado-tickets-usuario/listado-tickets-usuario.component';
import { ModificarComentarioComponent } from './components/administracion/forms/forms-comentarios/modificar-comentario/modificar-comentario.component';
import { CrearUsuarioComponent } from './components/administracion/forms/forms-usuarios/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './components/administracion/forms/forms-usuarios/modificar-usuario/modificar-usuario.component';
import { ModificarProductoComponent } from './components/administracion/forms/forms-productos/modificar-producto/modificar-producto.component';
import { CrearProductoComponent } from './components/administracion/forms/forms-productos/crear-producto/crear-producto.component';
import { DetallesProductoComponent } from './components/administracion/forms/forms-productos/detalles-producto/detalles-producto.component';
import { CrearTicketComponent } from './components/tickets-usuario/form/crear-ticket/crear-ticket.component';
import { ModificarTicketComponent } from './components/tickets-usuario/form/modificar-ticket/modificar-ticket.component';
import { ImagenProductoComponent } from './components/imagen-producto/imagen-producto.component';
import { DescuentoComponent } from './components/descuento/descuento.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FooterComponent } from './components/footer/footer.component';
import { CestaComponent } from './components/cesta/cesta.component';
import { HistorialComponent } from './components/historial/historial.component';
import { TablaLineaPedidoComponent } from './components/tabla-linea-pedido/tabla-linea-pedido.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ReloaderComponent } from './components/busqueda/reloader/reloader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AsistenciaComponent,
    AdministracionComponent,
    TicketsUsuarioComponent,
    SaldoComponent,
    LoginComponent,
    RegistroComponent,
    DialogComponent,
    GestionUsuarioComponent,
    GestionComentariosComponent,
    GestionProductosComponent,
    SafePipe,
    TicketsCuentaComponent,
    TicketsPagosComponent,
    TicketsProductosComponent,
    TicketsResueltosComponent,
    ListadoTicketsUsuarioComponent,
    ModificarComentarioComponent,
    CrearUsuarioComponent,
    ModificarUsuarioComponent,
    ModificarProductoComponent,
    CrearProductoComponent,
    DetallesProductoComponent,
    CrearTicketComponent,
    ModificarTicketComponent,
    ImagenProductoComponent,
    DescuentoComponent,
    ProductoComponent,
    FooterComponent,
    CestaComponent,
    HistorialComponent,
    TablaLineaPedidoComponent,
    PagosComponent,
    CatalogoComponent,
    PerfilComponent,
    BusquedaComponent,
    ReloaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatBadgeModule,
    MatChipsModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
