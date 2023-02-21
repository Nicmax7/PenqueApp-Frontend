import { Component, OnInit } from '@angular/core';
import { DtUser } from 'src/app/models/Datatypes/DtUser'; 

import { Router } from '@angular/router';

@Component({
  selector: 'app-headerA',
  templateUrl: './headerAdmin.component.html',
  styleUrls: ['./headerAdmin.component.css']
})
export class headerAdminComponent implements OnInit {

  constructor(
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    const usr: DtUser = this.getLocalStorage();

    //TODO: Handle token expire date.
    return !usr ? false : true;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
