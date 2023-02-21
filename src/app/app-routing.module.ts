import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login/login.component';
import { RegisterComponent } from './auth/pages/register/register/register.component';
import { RestorePasswordComponent } from './auth/pages/restore-password/restore-password.component';
import { PencasListComponent } from './usuario/pantalla-principal/pencas-list/pencas-list.component';
import { PencasAdminComponent } from './admin/mis-pencas/pencasAdmin.component';
import { ligaIndividualAdminComponent } from './admin/pencas-competencia/ligaIndividualAdmin.component';
import { ligaEquipoAdminComponent } from './admin/pencas-equipo/ligaEquipoAdmin.component'; 
import { MisPencasListComponent } from './usuario/mis-pencas/me-pencas-list/me-pencas-list.component';
import { pencasEquipoUComponent } from './usuario/penca-equipo/pencasEquipoU.component';
import { partidoComponent } from './usuario/partido/partido.component';
import { AltaEmpresaComponent } from './superAdmin/altaEmpresa/altaempresa.component';
import { RegisterAdminComponent} from './superAdmin/registroAdmin/registroAdmin.component'
import { AltaEquipoComponent } from './superAdmin/altaEquipo/altaEquipo.component';
import { AltaParticipanteComponent } from './superAdmin/altaParticipante/altaParticipante.component';
import { AltaCompetenciaComponent } from './superAdmin/altaCompetencia/altaCompetencia.component';
import { AltaLigaEquipoComponent } from './superAdmin/altaLigaEquipo/altaLigaEquipo.component';
import { AltaLigaIndividualComponent } from './superAdmin/altaLigaIndividual/altaLigaIndividual.component';
import { ConfigurarLigaEquiposComponent } from './superAdmin/configurarLigaEquipos/configurarLigaEquipos.component';
import { AltaPencaEquipoComponent } from './superAdmin/altaPencaEquipo/altaPencaEquipo.component';
import { AltaPencaIndividualComponent } from './superAdmin/altaPencaIndividual/altaPencaIndividual.component';
import { AltaPencaIndividualEmpresaComponent } from './empresa/altaPencaIndividual/altaPencaIndividual.component'; 
import { AltaPencaEquipoEmpresaComponent } from './empresa/altaPencaEquipo/altaPencaEquipo.component';
import { pencasIndividualUComponent } from './usuario/penca-individual/pencasIndividualU.component';
import { InvitarUsuarioAPencaComponent } from './empresa/invitarUsuarioPenca/invitarUsuarioPenca.component';
import { ConfigurarLigaIndividualComponent } from './superAdmin/configurarLigaIndividual/configurarLigaIndividual.component';
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
import { LigasSuperAdminComponent } from './superAdmin/mis-Ligas/ligasSuperAdmin.component';
import { UsuarioBilleteraComponent } from './usuario/depositar-billetera/depositar-usuario.component'; 
import { EmpresaBilleteraComponent } from './empresa/mi-billetera/depositar-empresa.component';
import { listarAdminComponent} from './superAdmin/listarAdmin/listarAdmin.component';
import { ForoComponent } from './usuario/foro/foro.component'; 
import { ConfiguracionCompetenciaComponent } from './superAdmin/configurarLigaIndividual/configuracionCompetencia.component';
import { MensajesUComponent } from './usuario/mensajes/mensajes.component';
import { CasillaMensajesUComponent } from './usuario/casilla-mensajes/casilla-mensajes.component';
import { MensajesEComponent } from './empresa/mensajes/mensajes.component';
import { CasillaMensajesEComponent } from './empresa/casilla-mensajes/casilla-mensajes.component';
import { AccesoDenegadoComponent } from './acceso-denegado/acceso-denegado.component';
import { ReporteEmpresaComponent } from './empresa/reporte/reporteEmpresa.component';
import { AdminBilleteraComponent } from './admin/mi-billetera/adminBilletera.component';

const routes: Routes = [
  { path: 'userIndex', component: PencasListComponent },
  { path: 'empresaIndex', component: PencasEmpresaComponent},
  { path: 'superAdminIndex', component: LigasSuperAdminComponent },
  { path: 'adminIndex', component: PencasAdminComponent },
  { path: 'mis/Pencas/Usuario', component: MisPencasListComponent },
  { path: 'me/ligaIndividual', component: ligaIndividualAdminComponent },
  { path: 'me/ligaEquipo', component: ligaEquipoAdminComponent },
  { path: 'me/pencasEquipo', component: pencasEquipoUComponent },
  { path: 'me/pencasIndividual', component: pencasIndividualUComponent },
  { path: 'partido', component: partidoComponent },
  { path: 'competencia', component: CompetenciaComponent },
  { path: 'altaEmpresa', component: AltaEmpresaComponent },
  { path: 'altaEquipo', component: AltaEquipoComponent },
  { path: 'altaParticipante', component: AltaParticipanteComponent },
  { path: 'altaCompetencia', component: AltaCompetenciaComponent },
  { path: 'altaLigaEquipo', component: AltaLigaEquipoComponent },
  { path: 'altaLigaIndividual', component: AltaLigaIndividualComponent},
  { path: 'SuperAdmin/altaPencaEquipo', component: AltaPencaEquipoComponent},
  { path: 'SuperAdmin/altaPencaIndividual', component: AltaPencaIndividualComponent},
  { path: 'SuperAdmin/pencaEquipoSuperAdmin', component: PencaEquipoSuperAdminComponent},
  { path: 'SuperAdmin/pencaIndividualSuperAdmin', component: PencaIndividualSuperAdminComponent},
  { path: 'SuperAdmin/configurarLigaEquipos', component: ConfigurarLigaEquiposComponent},
  { path: 'SuperAdmin/configurarLigaIndividual', component: ConfigurarLigaIndividualComponent},
  { path: 'SuperAdmin/configuracionCompetencia', component: ConfiguracionCompetenciaComponent},
  { path: 'SuperAdmin/pencasSuperAdmin', component: PencasSuperAdminComponent},
  { path: 'Empresa/altaPencaIndividual', component: AltaPencaIndividualEmpresaComponent},
  { path: 'Empresa/altaPencaEquipo', component: AltaPencaEquipoEmpresaComponent},
  { path: 'Empresa/pencaIndividualEmpresaComponent', component: PencaIndividualEmpresaComponent},
  { path: 'Empresa/pencaEquipoEmpresaComponent', component: PencaEquipoEmpresaComponent},
  { path: 'Empresa/reporteEmpresa', component: ReporteEmpresaComponent},
  { path: 'Usuario/Penca/dashboard', component: DashboardUserComponent},
  { path: 'Usuario/me/billetera', component: UsuarioBilleteraComponent},
  { path: 'Empresa/me/billetera', component: EmpresaBilleteraComponent},
  { path: 'Usuario/Penca/Foro', component: ForoComponent},
  { path: 'Usuario/chat', component: MensajesUComponent},
  { path: 'Usuario/casilla-mensajes', component: CasillaMensajesUComponent},
  { path: 'Empresa/chat', component: MensajesEComponent},
  { path: 'Empresa/casilla-mensajes', component: CasillaMensajesEComponent},
  { path: 'Admin/Saldo', component: AdminBilleteraComponent},
  { path: 'access-denied', component: AccesoDenegadoComponent},
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'restore-password', 
    component: RestorePasswordComponent
  },
  { path: 'altaAdmin', component: RegisterAdminComponent},
  { path: 'invitarUsuarioAPenca', component: InvitarUsuarioAPencaComponent},
  { path: 'aceptarRechazarUsuario', component: AceptarRechazarUsuarioComponent},
  { path: 'AceptarRechazarEmpresa', component: AceptarRechazarEmpresaComponent},
  { path: 'SuperAdmin/listarAdministradores', component: listarAdminComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
