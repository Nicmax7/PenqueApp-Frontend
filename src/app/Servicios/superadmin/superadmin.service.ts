import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DtEmpresa } from "src/app/models/Datatypes/DtEmpresa";
import { DtEquipo }  from "src/app/models/Datatypes/DtEquipo";
import { DtParticipante } from "src/app/models/Datatypes/DtParticipante";
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { DtPartidoCreacion } from 'src/app/models/Datatypes/DtPartidoCreacion';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { DtCrearPencasCompartida } from 'src/app/models/Datatypes/DtCrearPencaCompartida';
import { DtAdmin } from 'src/app/models/Datatypes/DtAdmin';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  apiURL: string = `${environment.BACKEND_API_URL}`

  constructor(private http: HttpClient) { }

  registarEmpresa(DtEmpresa: DtEmpresa): Observable<Object> {
    return this.http.post(`${this.apiURL}Empresa/altaEmpresa`, DtEmpresa);
  }

  registrarEquipo(DtEquipo: DtEquipo): Observable<Object> { 
    return this.http.post(`${this.apiURL}Equipo/altaEquipo`, DtEquipo); 
  }  

  registrarParticipante(DtParticipante: DtParticipante): Observable<Object> { 
    return this.http.post(`${this.apiURL}Participante/altaParticipante`, DtParticipante);
  }

  registrarPartido(DtPartido: DtPartidoCreacion): Observable<DtPartidoCreacion>{
    return this.http.post<DtPartidoCreacion>(`${this.apiURL}Partido/altaPartido`, DtPartido);
  }

  registrarCompetencia(DtCompetencia: DtCompetencia): Observable<DtCompetencia> { 
    return this.http.post<DtCompetencia>(`${this.apiURL}Competencia/altaCompetencia`, DtCompetencia);
  }
  
  registrarLigaEquipo(DtLigaEquipo: DtLigaEquipo): Observable<Object>{
    return this.http.post(`${this.apiURL}LigaEquipo/altaLigaEquipo`, DtLigaEquipo);
  }

  registrarLigaIndividual(DtLigaIndividual: DtLigaIndividual): Observable<Object>{
    return this.http.post(`${this.apiURL}LigaIndividual/altaLigaIndividual`, DtLigaIndividual);
  }

  altaPencaEquipo(DtP: DtCrearPencasCompartida): Observable<DtCrearPencasCompartida>{
    return this.http.post<DtCrearPencasCompartida>(`${this.apiURL}Penca/altaPencaCompartida/equipo`, DtP);
  }

  altaPencaIdividual(DtP: DtCrearPencasCompartida): Observable<DtCrearPencasCompartida>{
    return this.http.post<DtCrearPencasCompartida>(`${this.apiURL}Penca/altaPencaCompartida/individual`, DtP);
  }

  actualizarResultado(id:number){
    return this.http.put(`${this.apiURL}Partido/actualizarResultado/${id}`,{});
  }

  terminarCompetencia(id:number){
    return this.http.put(`${this.apiURL}Competencia/terminarCompetencia/${id}`,{});
  }

  chequearFinalizadaIndividual(id:number){
    return this.http.put(`${this.apiURL}LigaIndividual/chequearFinalizada/${id}`,{});
  }

  chequearFinalizadaEquipo(id:number){
    return this.http.put(`${this.apiURL}LigaEquipo/chequearFinalizada/${id}`,{});
  }

  getPencasCompartidas(deporte:number): Observable<DtPencasCompartida[]> {
    return this.http.get<DtPencasCompartida[]>(`${this.apiURL}SuperAdmin/PencasCompartidasGet?deporte=${deporte}`);
  }

  getLigasPorDeporte(deporte:number): Observable<DtLigaEquipo[]> {
    return this.http.get<DtLigaEquipo[]>(`${this.apiURL}LigaEquipo/getLigasPorDeporte?tipo=${deporte}`);
  }

  getLigasPorDisciplina(disciplina:number): Observable<DtLigaIndividual[]> {
    return this.http.get<DtLigaIndividual[]>(`${this.apiURL}LigaIndividual/getLigasPorDisciplina?disciplina=${disciplina}`);
  }

  getLigaEquipoById(IdLiga:number): Observable<DtLigaEquipo> {
    return this.http.get<DtLigaEquipo>(`${this.apiURL}LigaEquipo/${IdLiga}`,{});
  }

  getAdmin(): Observable<DtAdmin[]>{
    return this.http.get<DtAdmin[]>(`${this.apiURL}Admin/getAdmins`,{});
  }

  getPencasCompartidasSinAdminEquipo(idLiga:number): Observable<DtPencasCompartida[]>{
    return this.http.get<DtPencasCompartida[]>(`${this.apiURL}Admin/getPencasCompartidasSinAdminEquipo?idLiga=${idLiga}`);
  }

  getPencasCompartidasSinAdminIndividual(idLiga:number): Observable<DtPencasCompartida[]>{
    return this.http.get<DtPencasCompartida[]>(`${this.apiURL}Admin/getPencasCompartidasSinAdminIndividual?idLiga=${idLiga}`);
  }
  getLigaIndividualById(IdLiga:number): Observable<DtLigaIndividual> {
    return this.http.get<DtLigaIndividual>(`${this.apiURL}LigaIndividual/${IdLiga}`,{});
  }

}
