import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn: boolean = false;

  login(username:string, password:string):boolean{
    if (username === 'rolo' && password === '1234'){
      this.isLoggedIn = true;
      return true;
    }else{
      this.isLoggedIn = false;
      return false;
    }
  }

  logout():void {
    this.isLoggedIn = false;
  }

  isAuthenticated():boolean{
    return this.isLoggedIn;
  }
}
