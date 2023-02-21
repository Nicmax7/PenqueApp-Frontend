import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DtParticipante } from "src/app/models/Datatypes/DtParticipante";
import { Tipo_Area } from 'src/app/models/enums/Tipo_Area';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtNombre } from 'src/app/models/Datatypes/DtNombre';


@Injectable({
  providedIn: 'root'
})
export class CompetenciasService {

  apiURL: string = `${environment.BACKEND_API_URL}`

  constructor(private http: HttpClient) { }

  getCompetenciasSinUsar(Tipo_Area: Tipo_Area): Observable<DtCompetencia[]> {
    return this.http.get<DtCompetencia[]>(
      `${this.apiURL}Competencia/getCompetenciasSinUsar?area=${Tipo_Area}`
    );
  }

  getParticipantesHabilitados(competenciaId: number): Observable<DtParticipante[]> {
    return this.http.get<DtParticipante[]>(
      `${this.apiURL}Competencia/mostrarParticipantesHabilitados/${competenciaId}`
    );
  }

  agregarParticipante(idCompetencia: number, idParticipante: number) {
    return this.http.put<DtParticipante>(
      `${this.apiURL}Competencia/agregarParticipante/${idCompetencia}?idParticipante=${idParticipante}`, {}
    );
  }

  getParticipantesCompetencia(id: number): Observable<DtParticipante[]> {
    return this.http.get<DtParticipante[]>(
      `${this.apiURL}Competencia/mostrarParticipantes/${id}`
    );
  }

  mostrarParticipantesPorPaisArea(pais: string, Tipo_Area: Tipo_Area | number): Observable<DtParticipante[]> {
    return this.http.get<DtParticipante[]>(
      `${this.apiURL}Participante/mostrarParticipantesPorPaisArea/${Tipo_Area}?pais=${pais}`
    );
  }

  getCompetencia(id: number): Observable<DtCompetencia> {
    return this.http.get<DtCompetencia>(
      `${this.apiURL}Competencia/${id}`
    );
  }

  mostrarResultados(id: number): Observable<DtNombre[]> {
    return this.http.get<DtNombre[]>(
      `${this.apiURL}Competencia/mostrarResultados/${id}`
    );
  }



}
