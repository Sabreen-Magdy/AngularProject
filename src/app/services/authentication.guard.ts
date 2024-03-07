import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let service=inject(AccountService);
  if(service.IsLogin()){
       return service.IsLogin();
  }else{
       let router=inject(Router);
       router.navigate(['/login']);
       return false;
  }
};
