import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css']
})
export class AllpostsComponent implements OnInit {
  userReceivedArray: any[] = []
  allPosts: any[] = [];
  isAllPostsSelected = false;
  isMyPostsSelected = false;
  myPostUser: string;
  registerForm: FormGroup;
  acitve: boolean = true
  editVal: any;
  indexVal: any;
  img: any;
  myPostView: any;
  setImage: any;

  constructor(public router: Router, public userSer: UsersService) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'title': new FormControl(),
      'description': new FormControl(),
      'createdBy': new FormControl(),
      'postImgPath' : new FormControl(),
      'loginBy' : new FormControl(),
    });

    this.myPostUser = localStorage.getItem("signedUser")
    this.allPost();
  }

  allPost() {
    this.isAllPostsSelected = true;
    this.isMyPostsSelected = false;
    // this.userReceivedArray = JSON.parse(localStorage.getItem("post")) || []
    // this.allPosts = this.userReceivedArray;
    this.userSer.allpostShow().subscribe((data: any) => {
      this.userReceivedArray = data;
     // console.log(this.userReceivedArray);
    }, (error) => {
      console.log(error);
      
    });
  }

  myPost() {
    // this.userReceivedArray = [];
    // var user = localStorage.getItem("loggedUser")
    // var posts = JSON.parse(localStorage.getItem("post"))
    // posts.map((post) => {
    //   if (post["createdBy"] === user) {
    //     this.userReceivedArray.push(post)
    //   }
    // });
    this.isAllPostsSelected = false;
    this.isMyPostsSelected = true;
    var user = localStorage.getItem("signedUser");
    this.userSer.showMypost({ loginBy: user }).subscribe((data: any) => {
    this.userReceivedArray = data;
    });
  }

   editPost(index, data) {
    this.editVal = data;
    this.indexVal = index;
    this.registerForm.controls['title'].setValue(this.editVal.title)
    this.registerForm.controls['description'].setValue(this.editVal.description)
  }

  selectImg(event:any)  
  {
       this.setImage = event.target.files[0];
       console.log(this.setImage)
  }

  updateValue() {
    let obj = {
      _id : this.editVal._id,
      description: this.registerForm.controls.description.value,
      title: this.registerForm.controls.title.value,
      postImgPath:this.setImage.name
    }
    this.userSer.updatePost(obj).subscribe((data:any)=>{
      console.log(data);
    })
   this.isMyPostsSelected ? this.myPost() : this.allPost();

    // let updatedAllPosts = this.allPosts.map((post) => {
    //   if (this.editVal.createdBy === post.createdBy && 
    //      this.editVal.description === post.description &&
    //      this.editVal.title === post.title) {
    //     return obj;
    //   } else {
    //     return post
    //   }
    // });
   // localStorage.setItem("post", JSON.stringify(updatedAllPosts));
    
  }

  // onImageSelect(event: Event) {
  //   const image = (event.target as HTMLInputElement).files[0];
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     this.img = reader.result;
  //   };
  //   reader.readAsDataURL(image);
  // }







}
