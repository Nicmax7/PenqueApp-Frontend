import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/helpers/helpers';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtEmpresa } from 'src/app/models/Datatypes/DtEmpresa';
import { EmpresaService } from 'src/app/Servicios/empresa/empresa.service';
import { User } from '@angular/fire/auth';
import { AdministracionService } from 'src/app/Servicios/administracion/administracion.service';
import { DtAdmin } from 'src/app/models/Datatypes/DtAdmin';

@Component({
  selector: 'app-adminBilletera',
  templateUrl: './adminBilletera.component.html',
  styleUrls: ['./adminBilletera.component.css'],
})
export class AdminBilleteraComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showPaypalButtons: boolean = false;
  constructor(
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdminBilleteraComponent>,
    private spinner: NgxSpinnerService,
    private user: AdministracionService,
  ) {}
  token: string = '';
  userData!: DtUser;
  userEmpresa: DtEmpresa = {};
  pago: boolean = false;
  dineroFormControl = new FormControl('', [Validators.required]);
  dinero!: string;
  admin!: DtAdmin;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('authUser')!);
    if (this.userData.id != undefined) {
      this.user.getAdmin(this.userData.id).subscribe({
        next: async (response) => {
          this.admin = response;
        },
        error: (err) => {},
      });
    }
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }
  isAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 1){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  habilitarPaypal() {
    if (
      this.dineroFormControl.value != '' &&
      this.dineroFormControl.value != null
    ) {
      this.pago = true;
      this.dinero = this.dineroFormControl.value;
    } else {
      this.showSnackBar('Debes ingresar un monto', SnackBarStatus.WARNING);
    }
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
}
