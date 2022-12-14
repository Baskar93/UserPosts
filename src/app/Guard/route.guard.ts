import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(public router: Router, public userSer : UsersService)
  {

  }
  canActivate():boolean 
  {

    if(!localStorage.getItem("loggedUser"))
    {
      this.router.navigateByUrl("/");

    }
    
      return !!localStorage.getItem("loggedUser")
     
     
  }
  }

