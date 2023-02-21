import { Component, OnInit } from '@angular/core';
import { DtUser } from "../models/Datatypes/DtUser"

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
