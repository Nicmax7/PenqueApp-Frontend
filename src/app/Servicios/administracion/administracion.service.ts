import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { environment } from 'src/environments/environment';
import { DtAdmin } from 'src/app/models/Datatypes/DtAdmin';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  apiURL: string = `${environment.BACKEND_API_URL}`

  constructor(private http: HttpClient) { }

  getAdmin(id:number): Observable<DtAdmin> {
    return this.http.get<DtAdmin>(`${this.apiURL}Admin/${id}`);
  }

  getPencasCompartidas(id:number): Observable<DtPencasCompartida[]> {
    return this.http.get<DtPencasCompartida[]>(`${this.apiURL}Admin/PencasCompartidasGet/${id}`);
  }

  chequearLigaIndividualFinalizada(id:number){
    return this.http.put(`${this.apiURL}Penca/chequearLigaIndividualFinalizada/${id}`,{});
  }

  chequearLigaEquipoFinalizada(id:number){
    return this.http.put(`${this.apiURL}Penca/chequearLigaEquipoFinalizada/${id}`,{});
  }

  registroAdmin(DtAdmin: DtAdmin): Observable<Object>{
    return this.http.post(`${this.apiURL}Admin/altaAdmin`, DtAdmin);
  }

  agregarPencaAdmin(idAdmin: number, idPenca: number){
    return this.http.put(`${this.apiURL}Admin/agregarPenca?idADmin=${idAdmin}&idPenca=${idPenca}`,{});
  }

}
