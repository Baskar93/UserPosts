import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  receUser: any[] = []
  reactiveValidation: FormGroup; y
  msg: any;
  constructor(public userSer: UsersService, public router: Router,) { }

  ngOnInit(): void {

    if (this.userSer.loggedStatus$) {
      this.router.navigateByUrl("/logged/newpost")
    }

    this.reactiveValidation = new FormGroup({
      "mail": new FormControl("", [Validators.required, Validators.email]),
      "passwd": new FormControl("", [Validators.required])
    });

    //  if(localStorage.getItem("registerUsers"))
    //  {
    //    this.receUser = JSON.parse(localStorage.getItem("registerUsers")) || [];

    //  }     
  }

  doLogin() {
    // var email = this.reactiveValidation.controls.mail.value;
    // var password = this.reactiveValidation.controls.Pswd.value;
    // for(let x in this.receUser)
    // {
    //   if(email == this.receUser[x].mail && password == this.receUser[x].passwd)
    //   {
    //     this.userSer.loggedStatus$.next("login")
    //     localStorage.setItem("loggedUser",JSON.stringify(email));
    //     this.router.navigateByUrl("/logged/newpost"); 
    //   }
    //   else
    //   {
    //      this.msg = "Invalid login"

    //   }
    // }

    this.userSer.userLogin(this.reactiveValidation.value).subscribe((data:string) => {
       console.log(data);
       console.log(this.reactiveValidation.value);
      if (data.length == 0) {
        this.msg = "Invalid Login" ;
      }  
      else {
        localStorage.setItem("signedUser", this.reactiveValidation.value.mail)
        this.userSer.loggedStatus$.next("login")
        localStorage.setItem("loggedUser", data)
        this.router.navigateByUrl("/logged/newpost");
      }
    }, (error) => {
      console.log(error);
    });

  }



}