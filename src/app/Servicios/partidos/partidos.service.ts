import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DtEquipo }  from "src/app/models/Datatypes/DtEquipo";
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { Division } from 'src/app/models/enums/Division';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  apiURL: string = `${environment.BACKEND_API_URL}`

  constructor(private http: HttpClient) { }

  getEquiposPorDeporte(Tipo_Deporte :Tipo_Deporte | number, Pais :string): Observable<DtEquipo[]> {
    return this.http.get<DtEquipo[]>(
      `${this.apiURL}Equipo/equiposPorDeporteYPais?Tipo_Deporte=${Tipo_Deporte}&pais=${Pais}`
    );
  }

  GetEquiposByFiltros(Tipo_Deporte :Tipo_Deporte | number, Division :number, Pais :string): Observable<DtEquipo[]> {
    console.log("Division: "+Division)
    return this.http.get<DtEquipo[]>(
      `${this.apiURL}Equipo/equiposPorFiltros?Tipo_Deporte=${Tipo_Deporte}&division=${Division}&pais=${Pais}`
    );
  }
}
