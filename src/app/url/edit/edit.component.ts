import { Component, OnInit } from '@angular/core';
import {HttpBaseService} from "../../../services/httpBase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRouts} from "../../../constants";
import {Guid} from "guid-typescript";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {Url} from "../../../models/Url";

@Component({
  selector: 'app-edit-univercity',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUrlComponent implements OnInit {
  selectedFile = null;
  url = new Url();
  result: object;
  loading = true;


  constructor(public httpBaseService: HttpBaseService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location

  ) {
  }

  ngOnInit(): void {
    this.url.id = Guid.parse(this.route.snapshot.paramMap.get('urlId'));

    this.httpBaseService.Get(ApiRouts.getUrls + '/' + this.url.id.toString())
      .subscribe(x => {
        this.url = x as Url;
        this.loading = false;
        console.log(x);
      });
  }

  editUniversity() {
    this.loading = true;

    this.httpBaseService.Put(this.url, ApiRouts.getUrls + "/" + this.url.id).subscribe(x =>
    {
      console.log(x);
      this.location.back();
    });
  }
}
