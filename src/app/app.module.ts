import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './auth/pages/login/login/login.component';
import { RegisterComponent } from './auth/pages/register/register/register.component';
import { RestorePasswordComponent } from './auth/pages/restore-password/restore-password.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { headerAdminComponent } from './admin/header-admin/headerAdmin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PencasListComponent } from './usuario/pantalla-principal/pencas-list/pencas-list.component';
import { PencaFeedItemComponent } from './usuario/pantalla-principal/pencas-card/penca-feed-item.component';
import { PencaFeedComponent } from './usuario/pantalla-principal/pencas-comp/penca-feed.component';
import { PencasAdminComponent } from './admin/mis-pencas/pencasAdmin.component';
import { ligaIndividualAdminComponent } from './admin/pencas-competencia/ligaIndividualAdmin.component';
import { ligaEquipoAdminComponent } from './admin/pencas-equipo/ligaEquipoAdmin.component'; 
import { aceptarPencaComponent } from './usuario/componentes/aceptar-penca/aceptarPenca.component';
import { MisPencaFeedItemComponent } from './usuario/mis-pencas/me-penca-card/me-penca-feed-item.component';
import { MisPencaFeedComponent } from './usuario/mis-pencas/me-pencas-comp/me-penca-feed.component';
import { MisPencasListComponent } from './usuario/mis-pencas/me-pencas-list/me-pencas-list.component';
import { pencasEquipoUComponent } from './usuario/penca-equipo/pencasEquipoU.component';
import { partidoComponent } from './usuario/partido/partido.component';
import { RegisterAdminComponent} from './superAdmin/registroAdmin/registroAdmin.component'
import { predecirPartidoComponent } from './usuario/componentes/predecirPartido/predecirPartido.component'; 
import { MatSelectModule } from "@angular/material/select";
import { AltaEmpresaComponent } from './superAdmin/altaEmpresa/altaempresa.component'; 
import { AltaEquipoComponent } from './superAdmin/altaEquipo/altaEquipo.component';
import { AltaParticipanteComponent } from './superAdmin/altaParticipante/altaParticipante.component';
import { AltaCompetenciaComponent } from './superAdmin/altaCompetencia/altaCompetencia.component';
import { AltaLigaEquipoComponent } from './superAdmin/altaLigaEquipo/altaLigaEquipo.component';
import { AltaLigaIndividualComponent } from './superAdmin/altaLigaIndividual/altaLigaIndividual.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AltaPencaEquipoComponent } from './superAdmin/altaPencaEquipo/altaPencaEquipo.component';
import { AltaPencaIndividualComponent } from './superAdmin/altaPencaIndividual/altaPencaIndividual.component';
import { AltaPencaIndividualEmpresaComponent } from './empresa/altaPencaIndividual/altaPencaIndividual.component'; 
import { AltaPencaEquipoEmpresaComponent } from './empresa/altaPencaEquipo/altaPencaEquipo.component';
import { pencasIndividualUComponent } from './usuario/penca-individual/pencasIndividualU.component';
import { InvitarUsuarioAPencaComponent } from './empresa/invitarUsuarioPenca/invitarUsuarioPenca.component';
import { CompetenciaComponent } from './usuario/competencia/competencia.component';
//import { pencasIndividualUComponent } from './usuario/penca-individual/pencasIndividualU.component';
import { PencasEmpresaComponent } from './empresa/mis-pencas/pencasEmpresa.component';
import { PencaIndividualEmpresaComponent } from './empresa/pencas-competencia/pencaIndividualEmpresa.component';
import { PencaEquipoEmpresaComponent } from './empresa/pencas-equipo/pencaEquipoEmpresa.component';
import { PencasSuperAdminComponent } from './superAdmin/mis-pencas/pencasSuperAdmin.component';
import { PencaEquipoSuperAdminComponent } from './superAdmin/pencas-equipo/pencaEquipoSuperAdmin.component';
import { PencaIndividualSuperAdminComponent } from './superAdmin/pencas-competencia/pencaIndividualSuperAdmin.component';
import { DashboardUserComponent } from './usuario/dashboard/dashboardU.component';
import { AceptarRechazarUsuarioComponent } from './empresa/aceptarRechazarUsuario/aceptarRechazarUsuario.component'
import { AceptarRechazarEmpresaComponent } from './usuario/mis-invitaciones/aceptarRechazarEmpresa.component';
import { headerSuperadminComponent } from './superAdmin/header-Superadmin/header-Superadmin.component';
import { headerEmpresaComponent } from './empresa/header-empresa/headerempresa.component';
import { LigasSuperAdminComponent } from './superAdmin/mis-Ligas/ligasSuperAdmin.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { enableRipple } from '@syncfusion/ej2-base';
import { colorChangeComponent } from './superAdmin/colorChange/colorChange.component';
import { ConfigurarLigaEquiposComponent } from './superAdmin/configurarLigaEquipos/configurarLigaEquipos.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { UsuarioBilleteraComponent } from './usuario/depositar-billetera/depositar-usuario.component';
import { EmpresaBilleteraComponent } from './empresa/mi-billetera/depositar-empresa.component'; 
import { MatDialogRef } from '@angular/material/dialog';
import { listarAdminComponent} from './superAdmin/listarAdmin/listarAdmin.component';
import { ReporteEmpresaComponent } from './empresa/reporte/reporteEmpresa.component';
import { ForoComponent } from './usuario/foro/foro.component';
import { ConfigurarLigaIndividualComponent } from './superAdmin/configurarLigaIndividual/configurarLigaIndividual.component';
import { ConfiguracionCompetenciaComponent } from './superAdmin/configurarLigaIndividual/configuracionCompetencia.component';
import { ConfigurarLigaEquiposAgregarPartido } from './superAdmin/configurarLigaEquipos/configurarLigaEquiposAgregarPartido.component';

enableRipple(true);
import { MensajesUComponent } from './usuario/mensajes/mensajes.component';
import { CasillaMensajesUComponent } from './usuario/casilla-mensajes/casilla-mensajes.component';
import { MensajesEComponent } from './empresa/mensajes/mensajes.component';
import { CasillaMensajesEComponent } from './empresa/casilla-mensajes/casilla-mensajes.component';
import { AccesoDenegadoComponent } from './acceso-denegado/acceso-denegado.component';
import { AdminBilleteraComponent } from './admin/mi-billetera/adminBilletera.component';

//enableRipple(true);

@NgModule({
  declarations: [
    AccesoDenegadoComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RestorePasswordComponent,
    FooterComponent,
    HeaderComponent,
    PencasListComponent,
    PencaFeedItemComponent,
    PencaFeedComponent,
    PencasAdminComponent,
    ligaIndividualAdminComponent,
    ligaEquipoAdminComponent,
    headerAdminComponent,
    aceptarPencaComponent,
    MisPencaFeedItemComponent,
    MisPencaFeedComponent,
    MisPencasListComponent,
    pencasEquipoUComponent,
    partidoComponent,
    RegisterAdminComponent,
    AltaEmpresaComponent,
    predecirPartidoComponent,
    AltaEquipoComponent,
    AltaParticipanteComponent,
    AltaCompetenciaComponent,
    AltaLigaEquipoComponent,
    AltaLigaIndividualComponent,
    ConfigurarLigaEquiposComponent,
    AltaPencaEquipoComponent,
    AltaPencaIndividualComponent,
    AltaPencaIndividualEmpresaComponent,
    AltaPencaEquipoEmpresaComponent,
    pencasIndividualUComponent,
    InvitarUsuarioAPencaComponent,
    CompetenciaComponent,
    PencasEmpresaComponent,
    PencaEquipoEmpresaComponent,
    PencaIndividualEmpresaComponent,
    PencasSuperAdminComponent,
    PencaEquipoSuperAdminComponent,
    PencaIndividualSuperAdminComponent,
    DashboardUserComponent,
    AceptarRechazarUsuarioComponent,
    AceptarRechazarEmpresaComponent,
    headerSuperadminComponent,
    LigasSuperAdminComponent,
    headerEmpresaComponent,
    headerEmpresaComponent,
    ConfiguracionCompetenciaComponent,
    colorChangeComponent,
    UsuarioBilleteraComponent,
    EmpresaBilleteraComponent,
    listarAdminComponent,
    ConfigurarLigaIndividualComponent,
    ConfigurarLigaEquiposAgregarPartido,
    ForoComponent,
    MensajesUComponent,
    CasillaMensajesUComponent,
    MensajesEComponent,
    ReporteEmpresaComponent,
    CasillaMensajesEComponent,
    AdminBilleteraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule,
    NgxChartsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatInputModule,
    MatTabsModule,
    /*provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())*/
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ColorPickerModule,
    NgxPayPalModule,
  ],
  exports: [],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
 ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
