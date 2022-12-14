import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class TokeninterceptorsService implements HttpInterceptor {

  constructor(public userSer : UsersService) { }

  intercept(req:HttpRequest<any> , next : HttpHandler){

    //console.log("your Req on the way");  

    var tokenizedReq = req.clone({
      setHeaders :{
        myauthtoken : (this.userSer.getMyToken())? this.userSer.getMyToken() : '' 
      }
    });

    return next.handle(tokenizedReq);
  }
}
  