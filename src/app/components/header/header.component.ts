import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userType: any;

  constructor(public user: UsersService, public router: Router) {

  }

  ngOnInit(): void {
    this.user.loggedState.subscribe((data: any) => {
      // console.log(data);
      this.userType = data;
    });
  }

  doLogout() {
    this.user.loggedStatus$.next("logOut")
    localStorage.clear();
    this.router.navigateByUrl("/")
  }

}
