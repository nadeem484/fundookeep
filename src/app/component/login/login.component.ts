import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : any = {}
  constructor(private loginServices: HttpService, public snackBar:MatSnackBar, private router : Router) { }
  ngOnInit() {
  }

  /**
   * @description login function, in this we are calling login api
   */
  login(){
    this.loginServices.postData("user/login",{

      "email":this.model.email,
      "password":this.model.password

    }).subscribe(response=>{
      localStorage.setItem('token',response["id"]);
      localStorage.setItem('userid',response["userId"]);
      
      this.router.navigate(['/navbar','main-notes']);

    },error=>{
      this.snackBar.open("error","please enter valid data",{duration:2000})
    });
    
  }

}