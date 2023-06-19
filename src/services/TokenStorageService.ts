import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private UserData = 'userData';
  constructor() { }

  signOut() {
    window.localStorage.clear();
  }

  public saveUser(user: any) {

    window.localStorage.removeItem(this.UserData);
    window.localStorage.setItem(this.UserData, JSON.stringify(user));
  }

  public getUser() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(this.UserData));
  }
}
