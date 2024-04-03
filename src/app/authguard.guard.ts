import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from './services/user.service';

export const authguardGuard: CanActivateFn = async(route, state) => {
  const userService = inject(UserService);
  const userExist = await userService.getCurrentUser();
  if(userExist){
    return true
  }else{
    return false
  }

};
