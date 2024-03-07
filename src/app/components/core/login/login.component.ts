import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private accServ:AccountService ,private myRouter:Router){}
   myForm:FormGroup=new FormGroup({
    username:new FormControl(),
    password:new FormControl()
   })
   submit(e:Event){
     e.preventDefault();
     if(this.myForm.valid){
         this.accServ.Login(this.myForm.value.username,this.myForm.value.password);
         this.myRouter.navigate(['/products'])
     }
   }
   redirectTologin(){
    this.myRouter.navigate(['/register'])
   }
}
