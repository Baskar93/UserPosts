import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  msg: any;
  // allUsers :any[] = []

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit(): void {

       this.registerForm = new FormGroup({
      'fname': new FormControl("", [Validators.required]),
      'lname': new FormControl("", [Validators.required]),
      'age': new FormControl("", [Validators.required, Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$")]),
      'mail': new FormControl("", [Validators.required, Validators.email]),
      'ph': new FormControl("", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
      'passwd': new FormControl("", [Validators.required]),
  

    });

    // this.allUsers = JSON.parse(localStorage.getItem("registerUsers")) || []

  }

  doRegister() {
    // const saveEmp = this.registerForm.value;
    // this.allUsers.push(saveEmp);
    // localStorage.setItem("registerUsers", JSON.stringify(this.allUsers));
    // this.registerForm.reset();
    // this.router.navigateByUrl("/");
     this.userService.userRegistration(this.registerForm.value).subscribe((data: any) => {
      this.msg = data;
      console.log(this.registerForm.value);
      this.registerForm.reset()
    }, (error) => {
       console.log(error);
    });

  }

}
