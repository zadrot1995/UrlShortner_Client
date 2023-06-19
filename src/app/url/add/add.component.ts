import { Component, OnInit } from '@angular/core';
import {HttpBaseService} from '../../../services/httpBase.service';
import {ApiRouts} from '../../../constants';
import {Router} from '@angular/router';
import {Location} from "@angular/common";
// @ts-ignore
import {Url} from "../../../models/Url";
import {TokenStorageService} from "../../../services/TokenStorageService";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddUrlComponent implements OnInit {

  selectedFile = null;
  url = new Url();
  constructor(public httpBaseService: HttpBaseService,
              private router: Router,
              public tokenStorageService: TokenStorageService,
              private location: Location) {}

  addUrl(){
    this.url.creatorId = this.tokenStorageService.getUser().id;
    this.httpBaseService.Post(this.url, ApiRouts.getUrls).subscribe(x =>
    {
      console.log(x);
      this.location.back();
    });
  }
  ngOnInit(): void {
  }

}
