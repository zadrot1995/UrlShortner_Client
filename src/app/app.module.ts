import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {UrlsComponent} from "./url/urls/urls.component";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {PreloaderComponent} from "./preloader/preloader.component";
import {AddUrlComponent} from "./url/add/add.component";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "../auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
const routes: Routes = [
  {
    path: '',
    redirectTo: '/urls',
    pathMatch: 'full'
  },
  {
    path: 'urls',
    component: UrlsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'urls/add',
    component: AddUrlComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

];
@NgModule({
  declarations: [
    AppComponent,
    UrlsComponent,
    HeaderComponent,
    PreloaderComponent,
    AddUrlComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7039'],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
