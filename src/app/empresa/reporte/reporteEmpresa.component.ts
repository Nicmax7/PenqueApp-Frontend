import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EmpresaService } from 'src/app/Servicios/empresa/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtPencaEmpresa } from 'src/app/models/Datatypes/DtPencaEmpresa';
import { DtReporteEmpresa } from 'src/app/models/Datatypes/DtReporteEmpresa';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';

@Component({
  selector: 'app-reporteEmpresa',
  templateUrl: './reporteEmpresa.component.html',
  styleUrls: ['./reporteEmpresa.component.css']
})

export class ReporteEmpresaComponent implements OnInit {
  displayedColumns: string[] = ['name', 'deporte', 'fechaCreacion', 'plan', 'entrada', 'pozo'];
  public dataSource: MatTableDataSource<DtPenca> = new MatTableDataSource();
  dtReporte: DtReporteEmpresa = new DtReporteEmpresa();
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  loggedUser!: DtUser;

  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private router: Router,
    private helpers: HelperService,
  ) { }

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.loggedUser = this.helpers.getLocalStorage();
      if (this.loggedUser.id != undefined) {
        this.empresaService.reporteEmpresa(this.loggedUser.id).subscribe(data => {
          this.dtReporte = data
          if (this.dtReporte.pencas != undefined) {
            this.dataSource.data = this.dtReporte.pencas;
            this.formatearFecha(this.dtReporte.pencas)
          }
        })
      }
    };
  }

  isEmpresa(): boolean {
    const usr: DtUser = this.helpers.getLocalStorage();
    if (usr != null) {
      if (Number(usr.tipo_rol) == 3) {
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  formatearFecha(p: DtPenca[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha_Creacion?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }
}
