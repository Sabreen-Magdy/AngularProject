import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private accServ:AccountService ,private myRouter:Router){}
  myForm:FormGroup=new FormGroup({
    name:new FormControl(),
   password:new FormControl(),
   email:new FormControl(),
  })
  submit(e:Event){
    e.preventDefault();
    if(this.myForm.valid){
        this.accServ.Register(this.myForm.value);
        this.myRouter.navigate(['/login'])
    }
  }
}
