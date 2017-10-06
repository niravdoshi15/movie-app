import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { User } from "../../models/user";
import { LoginService } from "../../services/login.service";
import { LocalStorageService } from 'ngx-webstorage'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  private form: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private loginSvc: LoginService, private localStorageSvc: LocalStorageService) {

  }

  ngOnInit() {


    this.form = this.fb.group({

      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]

    })


  }


  public login() {

    if (this.form.valid) {
    
      var user= new User();
      user.username = this.form.value.username;
      user.password = this.form.value.password;

      let isValid = this.loginSvc.validateLogin(user)
   
      if (isValid) {
       
        this.localStorageSvc.store("username", user.username)
      
        this.router.navigate(['/'])
      }
      else {
        alert('Invalid User')
      }
    }
    else{
      alert('Invalid Form')
    }
  }

}

