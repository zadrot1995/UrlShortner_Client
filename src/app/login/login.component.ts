import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ApiRouts} from "../../constants";
import {TokenStorageService} from "../../services/TokenStorageService";
import {AuthenticatedResponse} from "../../models/AuthenticatedResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;
  userName = '';
  password = '';
  loading = false;


  constructor(private router: Router, private http: HttpClient, private tokenStorageService: TokenStorageService ) { }
  ngOnInit(): void {

  }
  login(){
    this.loading = true;
    var snapshot:any = {
      login: this.userName,
      password: this.password
    };
      this.http.post<AuthenticatedResponse>( ApiRouts.baseUrl +"auth/login", snapshot, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            debugger;

            const token = response.token;
            const refreshToken = response.refreshToken;
            localStorage.setItem("jwt", token);
            localStorage.setItem("refreshToken", refreshToken);
            this.http.get("https://localhost:7039/api/auth/getUser").subscribe(x => {
              debugger;
              this.tokenStorageService.saveUser(x);
                this.invalidLogin = false;
                this.router.navigate(["/"]);
              });
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        });

  }
}
