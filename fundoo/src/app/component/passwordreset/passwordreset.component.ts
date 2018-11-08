import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-passwordreset",
  templateUrl: "./passwordreset.component.html",
  styleUrls: ["./passwordreset.component.css"]
})
export class PasswordresetComponent implements OnInit {
  model: any = {
    password: "",
    confirmpassword: ""
  };

  constructor(
    public resetServices: HttpService,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar, private router: Router
  ) { }

  ngOnInit() { }
  public id = this.route.snapshot.params.id;
  //getting new password
  postPassword() {
    var body = { newPassword: this.model.password };
    var passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$/;

    /**
     * @description password validation
     */
    if ( passwordpattern.test(this.model.password) == false || passwordpattern.test(this.model.confirmpassword) == false) {
      this.snackBar.open("failed", "please follow the password pattern", {
        duration: 2000
      });
      return;
    }

    if (this.model.password != this.model.confirmpassword) {
      this.snackBar.open("failed", "both password should be same", {
        duration: 2000
      });
      return;
    }

    /**
     * @description calling  reset password api here to reset the password.
     */
    this.resetServices.postPassword("/user/reset-password", body, this.id)
      .subscribe(response => {
          this.router.navigate(['/login']); 
          this.snackBar.open("sucess", "password reset successfully", {
            duration: 2000
          });
          console.log("reset successful", response);
        },
        error => {
          console.log("error to reset", error);
        }
      );
  }
}
