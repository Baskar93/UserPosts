import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    
  // private isUserLoggedIn : BehaviorSubject<boolean>\\

  loggedStatus$ : any;
  loggedState : any;
 
  apiUrl = "http://localhost:3000/";

  constructor(public http:HttpClient) { 

  
   
    // const userLogin = localStorage.getItem("loggedUser")?true : false
    // this.isUserLoggedIn = new BehaviorSubject<boolean>(userLogin)

    //   this.loggedStatus$ = new BehaviorSubject<string>("login")
    //   this.loggedState = this.loggedStatus$.asObservable()
    // }
   
    if(localStorage.getItem("loggedUser"))
    {
     this.loggedStatus$ = new BehaviorSubject<string>("login")
     this.loggedState = this.loggedStatus$.asObservable()
    }
    else
    {
      this.loggedStatus$ = new BehaviorSubject<string>("logOut")
      this.loggedState = this.loggedStatus$.asObservable() 
    }
      
  }
 
  // public loggedStatus$ = new BehaviorSubject<string>("logOut")
  // loggedState = this.loggedStatus$.asObservable()
   

  
// setUserLoggedStatus(status:boolean)
// {
//   this.isUserLoggedIn.next(status)
  
// }

// public  getUserLoggedStatus():boolean
// {
//   return this.isUserLoggedIn.value;
// }

 userRegistration(register:any) {
  return this.http.post(this.apiUrl+"userRegister", register);
 }
 userLogin(login:any){
   return this.http.post<string>(this.apiUrl+"userLogin",login);
 }
 addNewPost(newPost:any){
   return this.http.post<any>(this.apiUrl+"addNewPost",newPost);
 }
 allpostShow(){
   return this.http.get<any>(this.apiUrl+"showAllpost");
 }
 showMypost(loginBy){
   return this.http.post<any>(this.apiUrl+"showMypost", loginBy);
 }
 showPulicPost(publicPost){
   return this.http.post<any>(this.apiUrl+"showPulicPost", publicPost);
 }
 updatePost(updatepost){
   return this.http.post<any>(this.apiUrl+"updatePost", updatepost)
 }
 getMyToken(){
   return localStorage.getItem("loggedUser")
 }
 

}
