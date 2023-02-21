import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';
import { HelperService } from 'src/app/helpers/helpers';
import { MatDialogRef } from '@angular/material/dialog';
import { CompetenciasService } from 'src/app/Servicios/compentecias/competencias.service';
import { MatTableDataSource } from '@angular/material/table';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtEquipo } from 'src/app/models/Datatypes/DtEquipo';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtParticipante } from 'src/app/models/Datatypes/DtParticipante';
import { DtNombre } from 'src/app/models/Datatypes/DtNombre';
import { Tipo_Area } from 'src/app/models/enums/Tipo_Area';


@Component({
  selector: 'app-configurarLigaIndividual',
  templateUrl: 'configuracionCompetencia.component.html',
  styleUrls: ['./configurarLigaIndividual.component.css'],
})

export class ConfiguracionCompetenciaComponent implements OnInit {

  constructor(
    private superAdminService: SuperAdminService,
    private competenciasService: CompetenciasService,
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfiguracionCompetenciaComponent>,

  ) { }

  errorMessage: string = '';
  visibility: boolean = true;

  paisFormControl = new FormControl('', [Validators.required]);
  participanteControl = new FormControl('', [Validators.required]);
  equiposLocal!: DtEquipo[];
  paises = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Escocia", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gales", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Inglaterra", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Palestina", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"];
  TipoDeporte!: number;
  competenciaId!: number;
  dtCompetencia: DtCompetencia = {};
  participantesInscriptos!: DtParticipante[];
  participantes!: DtParticipante[];
  posiciones!: DtNombre[];
  ganador!: DtNombre;
  participanteId!: number;
  pais!: DtNombre;
  cantParticipantes!: number;

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.competenciaId = JSON.parse(localStorage.getItem('Competencia')!);
      if (this.competenciaId != undefined) {
        this.competenciasService.getCompetencia(this.competenciaId).subscribe(data => {
          this.dtCompetencia = data;
          this.formatearFecha(data)
          if (data.estado) {
              this.competenciasService.getParticipantesCompetencia(this.competenciaId).subscribe(data => {
              this.participantesInscriptos = data;
            })
          }
          else {
            this.competenciasService.mostrarResultados(this.competenciaId).subscribe(data => {
              this.posiciones = data;
              this.ganador = data[0];
            })
          }
        });
      }
    }
  }

  cargarParticipantes() {
    if (this.paisFormControl.value != undefined && this.paisFormControl.value != '' && this.paisFormControl.value != "vacio" && this.dtCompetencia.area != undefined && this.dtCompetencia.area != null) {
      this.competenciasService.mostrarParticipantesPorPaisArea(this.paisFormControl.value, this.dtCompetencia.area).subscribe({
        next: async (response) => {
          this.participantes = response;
          console.log(response);
        },
        error: (err) => { },
      });
    }
  }

  guardarIdParticipante() {
    if (this.participanteControl.value != null && this.participanteControl.value != undefined) {
      this.participanteId = Number(this.participanteControl.value);
    }
  }

  agregarParticipante() {
    if (
      this.paisFormControl.value == null ||
      this.paisFormControl.value == 'undefined' ||
      this.participanteControl.value == 'undefined' ||
      this.participanteControl.value == undefined 
      ) {
      this.showSnackBar('Debes seleccionar un participante', SnackBarStatus.WARNING);
    } else {
      console.log(this.competenciaId)
      console.log(this.participanteId)
      this.competenciasService
        .agregarParticipante(this.competenciaId, this.participanteId)
        .subscribe({
          next: async (response) => {
            this.showSnackBar(
              'Se ha agregado al participante correctamente',
              SnackBarStatus.SUCCESS
            );
            this.helpers.redirectTo('/SuperAdmin/configuracionCompetencia');
          },
          error: (err) => {
            this.showSnackBar(err.error, SnackBarStatus.ERROR);
          },
        });
    }
  }

  isSuperAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 0){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  TerminarCompetencia() {
    this.superAdminService.terminarCompetencia(this.competenciaId).subscribe({
      next: async (response) => {
        this.helpers.redirectTo('SuperAdmin/configurarLigaIndividual');
        this.showSnackBar(
          'Haz finalizado la competencia correctamente',
          SnackBarStatus.SUCCESS
        );
      },
      error: (err) => {
        this.showSnackBar(err.error, SnackBarStatus.ERROR);
      },
    });
  }

  formatearFecha(p: DtCompetencia) {
    var splitted = p.fecha_competencia?.toString().split("T", 1);
    p.fecha_string = splitted![0];
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

}