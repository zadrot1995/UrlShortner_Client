import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ApiRouts} from "../../constants";
import {TokenStorageService} from "../../services/TokenStorageService";
import {AuthenticatedResponse} from "../../models/AuthenticatedResponse";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidLogin: boolean | undefined;
  userName = '';
  password = '';
  confirmPassword = '';
  detailsKey: string | undefined;
  role = '';

  constructor(private router: Router, private http: HttpClient, private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {

  }
  login(){
    debugger;
    var snapshot:any = {
      login: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    this.http.post<AuthenticatedResponse>( "https://localhost:7039/api/auth/register", snapshot, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          debugger
          const token = response.token;
          const refreshToken = response.refreshToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("refreshToken", refreshToken);
          this.http.get(ApiRouts.baseUrl + "/auth/getUser").subscribe(x => {
            this.tokenStorageService.saveUser(x);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
          });
          this.invalidLogin = false;
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      });

  }
}
