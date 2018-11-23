
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public service;
  model: any = {}

  public card = [];
  constructor(private signupServices: HttpService, public snackBar: MatSnackBar) { }

  //the ngOnInit gets called once the component has been initialized
  ngOnInit() {

    /**
     * @description getting data from backend
     */
    this.signupServices.getData("/user/service").subscribe((response) => {
      console.log(response);
      console.log(response["data"]);

      for (let i = 0; i < response["data"].data.length; i++) {
        response["data"].data[i].select = false;
        this.card.push(response["data"].data[i]);
      }
      console.log(this.card);

    })
  }
  response(data) {
    this.service = data.name;
    data.select = !data.select
    for (var j = 0; j < this.card.length; j++) {
      if (data.name == this.card[j].name)
        continue;
      this.card[j].select = false;
    }
  }

  /**
   * @description signup validation
   */
  signup() {
    // console.log(this.model);
    var emailpattern = /^[a-zA-Z0-9_.]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    var passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$/
    if (this.model.password != this.model.confirmpassword) {
      this.snackBar.open("failed", "please enter same password", {
        duration: 2000,
      });
      return
    }
    if (this.model.fname.length < 2 || !isNaN(this.model.fname) || this.model.lname.length < 2 || !isNaN(this.model.lname) ||
      emailpattern.test(this.model.email) == false || this.model.fname == this.model.lname || passwordpattern.test(this.model.password) == false) {
      this.snackBar.open("failed", "please enter valid data", {
        duration: 2000,
      });
      return
    }

  /**
   * @description calling signup api.
   */
    this.signupServices.postData("user/userSignUp", {

      "firstName": this.model.fname,
      "lastName": this.model.lname,
      "service": this.service,
      "email": this.model.email,
      "emailVerified": true,
      "password": this.model.password

    }).subscribe(response => {
      console.log("sign up succesfull", response)
    }, error => {
      console.log("error in signup", error)
    });
    console.log(this.model);
  }

}
