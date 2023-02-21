import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DtRegistro } from 'src/app/models/Datatypes/DtRegistro';
import { DtLogin } from 'src/app/models/Datatypes/DtLogin';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { environment } from 'src/environments/environment';
import { Tipo_Resultado } from 'src/app/models/enums/Tipo_Resultado';
import { DtPredicciones } from 'src/app/models/Datatypes/DtPredicciones';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { DtGoogle } from 'src/app/models/Datatypes/DtGoogle';
import { DtApuesta } from 'src/app/models/Datatypes/DtApuesta';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { DtMensajeForo } from 'src/app/models/Datatypes/DtMensajeForo';
import { DtMensaje } from 'src/app/models/Datatypes/DtMensaje';
import { DtChat } from 'src/app/models/Datatypes/DtChat';
import { DtEnviar } from 'src/app/models/Datatypes/DtEnviar';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = `${environment.BACKEND_API_URL}`

  constructor(private http: HttpClient, private fireAuth: AngularFireAuth, private router: Router) { }

  register(DtRegistro: DtRegistro): Observable<Object> {
    return this.http.post(`${this.apiURL}Usuario/Registro`, DtRegistro);

  }

  login(data: DtLogin){
    return this.http.post<DtUser>(`${this.apiURL}Usuario/login`, data);
  }

  verPrediccionPartido(idPartido:number, idUser:number, idPenca:number): Observable<Tipo_Resultado> {
    return this.http.get<Tipo_Resultado>(`${this.apiURL}Usuario/verPrediccionPartido?id=${idUser}&idPartido=${idPartido}&idPenca=${idPenca}`);
  }

  predecirUnPartido(dtP:DtPredicciones){
    return this.http.post<DtPredicciones>(`${this.apiURL}Usuario/predecirUnPartido`, dtP);
  }

  restorePassword(email: string){
    return this.http.put<DtUser>(`${this.apiURL}Usuario/recuperarContraseña?email=${email}`,{});
  }

  //login with Google
  googlePopUpLogin() {
    return this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginGoogle(data: DtGoogle){
    return this.http.post<DtGoogle>(`${this.apiURL}Usuario/loginGoogle`, data);
  }

  verApuestaCompetencia(idComp:number, idUser:number, idPenca:number): Observable<any> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    
    return this.http.get(`${this.apiURL}Usuario/verPrediccionCompetencia?id=${idUser}&idCompetencia=${idComp}&idPenca=${idPenca}`,requestOptions);
  }
  apostarAparticipante(dtA:DtApuesta){
    return this.http.post<DtApuesta>(`${this.apiURL}Usuario/apostarUnaCompetencia`, dtA);
  }

  listarInvitacionesPenca(id: number): Observable<DtPenca[]>{
    return this.http.get<DtPenca[]>(`${this.apiURL}Usuario/invitacionesPenca/${id}`);
  }

  aceptarInvitacion(idUsuario: number, idPenca: number){
    return this.http.put(`${this.apiURL}Usuario/aceptarInvitacion/${idUsuario}?idPenca=${idPenca}`,{});
  }

  rechazarInvitacion(idUsuario: number, idPenca: number){
    return this.http.put(`${this.apiURL}Usuario/rechazarInvitacion/${idUsuario}?idPenca=${idPenca}`,{});
  }

  miBilletera(id: number): Observable<DtUser>{
    return this.http.get<DtUser>(`${this.apiURL}Usuario/miBilletera/${id}`);
  }

  depositarBilletera(id: number,monto: number): Observable<DtUser>{
    return this.http.put(`${this.apiURL}Usuario/depositarBilleteraUsuario/${id}?monto=${monto}`,{});
  }

  comentarEnForo(dtF: DtMensajeForo){
    return this.http.post<DtMensajeForo>(`${this.apiURL}Usuario/comentarEnForo`, dtF);
  }

  verChat(id: number): Observable<DtMensaje[]>{
    return this.http.get<DtMensaje[]>(`${this.apiURL}Usuario/mostrarMensajes?idChat=${id}`);
  }

  verlistaChats(idUsuario:number): Observable<DtChat[]>{
    return this.http.get<DtChat[]>(`${this.apiURL}Usuario/mostrarChats?idUsuario=${idUsuario}`);
  }
  
  enviarMensaje(dtE: DtEnviar){
    return this.http.put(`${this.apiURL}Usuario/enviarMensaje`, dtE);
  }
}
