import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtEstadistica } from 'src/app/models/Datatypes/DtEstadisticas';
import { DtHistorial } from 'src/app/models/Datatypes/DtHistorial';
import { DtJuego } from 'src/app/models/Datatypes/DtJuego';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { DtPuntaje } from 'src/app/models/Datatypes/DtPuntaje';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PencasService {
  apiURL: string = `${environment.BACKEND_API_URL}`;

  constructor(private http: HttpClient) {}

  getPencasCompartidas(
    estado: boolean,
    id: number
  ): Observable<DtPencasCompartida[]> {
    return this.http.get<DtPencasCompartida[]>(
      `${this.apiURL}Penca/PencasCompartidasSegunEstado/${id}?estado=${estado}`
    );
  }

  mostrarCompetencias(id: number): Observable<DtCompetencia[]> {
    return this.http.get<DtCompetencia[]>(
      `${this.apiURL}LigaIndividual/mostrarCompetencias/${id}`
    );
  }

  getPartidos(id: number): Observable<DtPartido[]> {
    return this.http.get<DtPartido[]>(
      `${this.apiURL}LigaEquipo/getPartidos/${id}`
    );
  }

  unirmeaPenca(dtJuego: DtJuego): Observable<Object> {
    return this.http.post(`${this.apiURL}Usuario/unirseALaPenca`, dtJuego);
  }

  misPencas(id:number): Observable<DtPenca[]>{
    return this.http.get<DtPenca[]>(`${this.apiURL}Usuario/misPencas/${id}`);
  }

  getPartido(id:number): Observable<DtPartido>{
    return this.http.get<DtPartido>(`${this.apiURL}Partido/${id}`);
  }

  getHistorialEquipo(id:number): Observable<DtHistorial[]>{
    return this.http.get<DtHistorial[]>(`${this.apiURL}Equipo/mostrarHistorial/${id}`);
  }
  getIdLIga(id:number): Observable<number>{
    return this.http.get<number>(`${this.apiURL}Penca/getIdLIga/${id}`);
  }

  getEstadisticasPartido(id:number): Observable<DtEstadistica>{
    return this.http.get<DtEstadistica>(`${this.apiURL}Partido/estadisticasPartido/${id}`);
  }

  getInfoPenca(id:number): Observable<DtPenca>{
    return this.http.get<DtPenca>(`${this.apiURL}Penca/verInfoPenca/${id}`);
  }

  getPosicionesPenca(id:number): Observable<DtPuntaje[]>{
    return this.http.get<DtPuntaje[]>(`${this.apiURL}Penca/ListarPosiciones/${id}`);
  }

  cambiarColorPenca(color:string, id: number){
    return this.http.put(`${this.apiURL}Penca/cambiarColor/${id}?color=${color}`,{});
  }

  verForo(id:number): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiURL}Penca/verForo/${id}`);
  }
}


