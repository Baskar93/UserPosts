import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-publicposts',
  templateUrl: './publicposts.component.html',
  styleUrls: ['./publicposts.component.css']
})
export class PublicpostsComponent implements OnInit {

  receivedAllpostArray: any[] = [];

  constructor(public userSer : UsersService) { }

  ngOnInit(): void {
  var user = localStorage.getItem("loggedUser");
  this.userSer.showPulicPost(user).subscribe((data:any)=>{
    console.log(data);
    this.receivedAllpostArray = data;
  });


  }
  
}
