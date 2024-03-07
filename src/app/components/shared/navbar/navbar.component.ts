import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 constructor(private accServ:AccountService){}
 IsLogin(){
  return this.accServ.IsLogin();
 }
 IsAdmin(){
  return this.accServ.isAdmin();
 }
 LogOut(){
  return this.accServ.LogOut();
 }
}
