import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { Tipo_Area } from 'src/app/models/enums/Tipo_Area';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LigasService {
  apiURL: string = `${environment.BACKEND_API_URL}`;

  constructor(private http: HttpClient) {}

  getLigasIndividualesActivas(): Observable<DtLigaIndividual[]> {
    return this.http.get<DtLigaIndividual[]>(
      `${this.apiURL}LigaIndividual/getLigasSinUsar`
    );
  }
  getLigasEquiposActivas(): Observable<DtLigaEquipo[]> {
    return this.http.get<DtLigaEquipo[]>(
      `${this.apiURL}LigaEquipo/getLigasSinUsar`
    );
  }
  getLigasEquiposActivasPorDeporte(tipo:number): Observable<DtLigaEquipo[]> {
    return this.http.get<DtLigaEquipo[]>(
      `${this.apiURL}LigaEquipo/getLigasPorDeporte?tipo=${tipo}`
    );
  }

  getPartidosSinUsar(tipo:Tipo_Deporte | number): Observable<DtPartido[]> {
    return this.http.get<DtPartido[]>(
      `${this.apiURL}Partido/getPartidosSinUsar?tipo=${tipo}`
    );
  }
  getCompetenciasSinUsar(tipo:Tipo_Area | number): Observable<DtCompetencia[]> {
    return this.http.get<DtCompetencia[]>(
      `${this.apiURL}Competencia/getCompetenciasSinUsar?area=${tipo}`
    );
  }

  agregarPartidoaLaLiga(idPartido: number, id: number): Observable<DtPartido>{
    return this.http.put<DtPartido>(`${this.apiURL}LigaEquipo/agregarPartido/${id}?idPartido=${idPartido}`, {});
  }

  agregarCompetenciaLaLiga(idComp: number, id: number): Observable<DtCompetencia>{
    return this.http.put<DtCompetencia>(`${this.apiURL}LigaIndividual/agregarCompetencia/?idLiga=${id}&idCompetencia=${idComp}`, {});
  }

  getLigaEquipo(id:number): Observable<DtLigaEquipo>{
    return this.http.get<DtLigaEquipo>(`${this.apiURL}LigaEquipo/${id}`);
  }
}
