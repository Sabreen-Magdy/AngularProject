import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http:HttpClient,private router:Router) { }
  baseUrl:string="http://localhost:3002/users";
  token:boolean=false;
  userRole: string | null = null;
  userData:any;
  Login(userName:string , password:string){
    this.http.get(`${this.baseUrl}?email=${userName}&password=${password}`).subscribe((data)=>{
      if(Array.isArray(data) && data.length > 0){
        this.token=true;
        this.userRole = data[0].role;
      }
    })
  }
  Register(user: Iuser) {
    user.role = "user";
    this.http.post(this.baseUrl, user).subscribe(
      response => {
        console.log("Registration successful:", response);
      },
      error => {
        console.error("Registration failed:", error);
      }
    );
  }

  LogOut(){
    this.token=false;
    this.router.navigate(['/home']);
  }
  IsLogin(){
    return this.token;
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isUser(): boolean {
    return this.userRole === 'user';
  }
}
