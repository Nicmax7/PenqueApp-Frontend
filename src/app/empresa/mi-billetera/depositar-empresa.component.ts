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

@Component({
  selector: 'app-depositar-empresa',
  templateUrl: './depositar-empresa.component.html',
  styleUrls: ['./depositar-empresa.component.css'],
})
export class EmpresaBilleteraComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showPaypalButtons: boolean = false;
  constructor(
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EmpresaBilleteraComponent>,
    private spinner: NgxSpinnerService,
    private emp: EmpresaService
  ) {}
  token: string = '';
  userData!: DtUser;
  userEmpresa: DtEmpresa = {};
  pago: boolean = false;
  dineroFormControl = new FormControl('', [Validators.required]);
  dinero!: string;

  ngOnInit(): void {
    this.initConfig();
    this.userData = JSON.parse(localStorage.getItem('authUser')!);
    if (this.userData.id != undefined) {
      this.emp.miBilletera(this.userData.id).subscribe({
        next: async (response) => {
          this.userEmpresa = response;
        },
        error: (err) => {},
      });
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'Abcai_hmhNVLcpeO2zxfWE5_-1BlJypcoApTKp4y9qA5hVskFaJLu14xIMi_joxHUJQTxRoIWqvowP9U',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.dinero,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.dinero,
                  },
                },
              },
              items: [
                {
                  name: 'Depositar en tu billetera:',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: this.dinero,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        color: 'gold',
      },
      onApprove: (data, actions) => {
        if (this.userData.id != undefined) {
          this.emp
            .depositarBilletera(this.userData.id, Number(this.dinero))
            .subscribe({
              next: async (response) => {
                this.showSnackBar('Deposito exitoso', SnackBarStatus.SUCCESS);
                this.helpers.redirectTo('/Empresa/me/billetera')
              },
              error: (err) => {},
            });
        }
      },
    };
  }
  isEmpresa(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 3){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
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
