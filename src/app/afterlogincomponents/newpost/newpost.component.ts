import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  msg:string; 
  registerForm: FormGroup;
  img: string;
  // userStorageArray: any[] = []
  // image: string;
  constructor(public router: Router , public userservice : UsersService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'title': new FormControl(),
      'description': new FormControl(),
      'selectedPost': new FormControl(),
      'selectedImage': new FormControl(),
      'createdBy' : new FormControl(),
      'loginBy': new FormControl(),
    });
    // this.userStorageArray = JSON.parse(localStorage.getItem("post")) || []
  }

  selectImg(event:any)
  {
       this.img = event.target.files[0];
  }
  
  newPost() {
    // if (!this.registerForm.invalid) {
    //   this.registerForm.get("createdBy").patchValue(localStorage.getItem("loggedUser"))
    //   var Userdetails = this.registerForm.value;
    //   this.userStorageArray.push(Userdetails)
    //   for (var i = 0; i < this.userStorageArray.length; i++) {
    //     if (i == this.userStorageArray.length - 1) {
    //       this.userStorageArray[i].selectedImage = this.img
    //       // this.userStorageArray[i].image = this.image
    //     }
    //   }
    //   localStorage.setItem("post", JSON.stringify(this.userStorageArray))
    //   this.router.navigateByUrl("/logged/allpost")
    //   console.log(this.userStorageArray);
    // }
       var fd = new FormData()
       fd.append("title", this.registerForm.controls.title.value);
       fd.append("description", this.registerForm.controls.description.value);
       fd.append("selectedPost", this.registerForm.controls.selectedPost.value);
       fd.append("loginBy", localStorage.getItem("signedUser"))
       fd.append("postImg", this.img );
       
       this.userservice.addNewPost(fd).subscribe((data:any)=>{
       console.log(data);
        this.msg = data;
      
       },(error)=>{
         console.log(error);
         this.msg = "Someting went wrong";
       });
       

  }

  sh(check)
  {
    if (check.checked)
    this.registerForm.controls['selectedImage'].setValidators(null);
    this.registerForm.controls['selectedImage'].updateValueAndValidity();
  }
  ch(check) {
    if (check.checked) {
      this.registerForm.controls['selectedImage'].setValidators([Validators.required]);
      this.registerForm.controls['selectedImage'].updateValueAndValidity();
    }
    else {
      this.registerForm.controls['selectedImage'].setValidators(null);
      this.registerForm.controls['selectedImage'].updateValueAndValidity();
    }

  }

  // onImageSelect(event:any) {
  //   const image = (event.target as HTMLInputElement).files[0];
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     this.img = reader.result;
  //     console.log(this.img);
  //   };
    

  //   reader.readAsDataURL(image);
  // }
}

