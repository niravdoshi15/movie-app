import { Component } from '@angular/core';
import { LoginService } from "./services/login.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginSvc: LoginService, private router: Router) { }
  
  public logout() {
    this.loginSvc.logout();
    this.router.navigate(['/'])
  }
}