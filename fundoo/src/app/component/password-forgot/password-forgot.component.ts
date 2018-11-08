import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {

  model : any = {}

  constructor(private forgotPasswordServices: HttpService, public snackBar:MatSnackBar) { }

  ngOnInit() {
  }


  forgot_password() {

    /**
     * @description validation for forget password 
     */
    var emailpattern= /^[a-zA-Z0-9_.]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    if(emailpattern.test(this.model.email)==false)
    {
      this.snackBar.open("failed", "please enter registerd email",{
        duration : 2000,
      })
      return
    }
    /**
     * @description calling password reset api to send reset link in email
     */
    this.forgotPasswordServices.postData("user/reset",{
      "email":this.model.email,

    }).subscribe(response=>{
      this.snackBar.open("sucess","check your mail email send sucessfully",{duration:2000})
      console.log("email send successful", response)
    },error=>{
      this.snackBar.open("error","please enter registered email",{duration:2000})
      console.log("error in sending ", error)
    });
  }


}
