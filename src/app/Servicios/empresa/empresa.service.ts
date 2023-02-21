import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DtChat } from 'src/app/models/Datatypes/DtChat';
import { DtEmpresa } from 'src/app/models/Datatypes/DtEmpresa';
import { DtEnviar } from 'src/app/models/Datatypes/DtEnviar';
import { DtInvitacion } from 'src/app/models/Datatypes/DtInvitacion';
import { DtMensaje } from 'src/app/models/Datatypes/DtMensaje';
import { DtPencaEmpresa } from 'src/app/models/Datatypes/DtPencaEmpresa';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtReporteEmpresa } from 'src/app/models/Datatypes/DtReporteEmpresa';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiURL: string = `${environment.BACKEND_API_URL}`

  constructor(private http: HttpClient) { }


  altaPencaEmpresaIndividual(DtE: DtPencaEmpresa): Observable<DtPencaEmpresa>{
    return this.http.post<DtPencaEmpresa>(`${this.apiURL}Penca/altaPencaEmpresa/individual`, DtE);
  }

  altaPencaEmpresaEquipo(DtE: DtPencaEmpresa): Observable<DtPencaEmpresa>{
    return this.http.post<DtPencaEmpresa>(`${this.apiURL}Penca/altaPencaEmpresa/equipo`, DtE);
  }

  invitarUsuarioAPenca(dtI: DtInvitacion): Observable<DtInvitacion>{
    return this.http.post<DtInvitacion>(`${this.apiURL}Empresa/invitarUsuario`, dtI);
  }
  
  getPencasEmpresa(id:number): Observable<DtPencaEmpresa[]> {
    return this.http.get<DtPencaEmpresa[]>(`${this.apiURL}Empresa/misPencas/${id}`);
  }

  chequearLigaIndividualFinalizada(id:number){
    return this.http.put(`${this.apiURL}Penca/chequearLigaIndividualFinalizada/${id}`,{});
  }

  chequearLigaEquipoFinalizada(id:number){
    return this.http.put(`${this.apiURL}Penca/chequearLigaEquipoFinalizada/${id}`,{});
  }

  getUsuariosAConfirmar(idEmpresa : number, idPenca: number): Observable<DtUser[]>{
    return this.http.get<DtUser[]>(`${this.apiURL}Empresa/listarUsuariosAEsperaDeConfirmacion?idEmpresa=${idEmpresa}&idPenca=${idPenca}`);
  }

  aceptarORechazar(idUsuario: number, idEmpresa: number, idPenca: number, aceptar: boolean){
    return this.http.post(`${this.apiURL}Empresa/AceptarORechazarUsuario?idUsuario=${idUsuario}&idPenca=${idPenca}&idEmpresa=${idEmpresa}&aceptar=${aceptar}`,{});
  }

  miBilletera(id: number): Observable<DtEmpresa>{
    return this.http.get<DtEmpresa>(`${this.apiURL}Empresa/miBilletera/${id}`);
  }

  depositarBilletera(id: number,monto: number): Observable<DtUser>{
    return this.http.put(`${this.apiURL}Empresa/depositarBilleteraEmpresa/${id}?monto=${monto}`,{});
  }

  verChat(id: number): Observable<DtMensaje[]>{
    return this.http.get<DtMensaje[]>(`${this.apiURL}Empresa/mostrarMensajes?idChat=${id}`);
  }

  verlistaChats(id:number): Observable<DtChat[]>{
    return this.http.get<DtChat[]>(`${this.apiURL}Empresa/mostrarChats?idEmpresa=${id}`);
  }
  
  enviarMensaje(dtE: DtEnviar){
    return this.http.put(`${this.apiURL}Empresa/enviarMensaje`, dtE);
  }

  reporteEmpresa(id: number): Observable<DtReporteEmpresa>{
    return this.http.get<DtReporteEmpresa>(`${this.apiURL}Empresa/reportes/${id}`);
  }

}
