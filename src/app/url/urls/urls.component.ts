import { Component, OnInit } from '@angular/core';
import {ApiRouts} from '../../../constants';
import {Url} from '../../../Models/Url';
import {HttpBaseService} from "../../../services/httpBase.service";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {
  // @ts-ignore
  urls: Url[];
  constructor(public httpBaseService: HttpBaseService) {}
  loading = true;
  ngOnInit(): void {

    debugger;
      this.httpBaseService.Get(ApiRouts.getUrls)
        .subscribe(x =>
        {
          var arr = x as Url[];
          console.log(x);
          this.urls = arr;
          this.loading = false;
        });
  }
  deleteUrl(id: Guid){
    this.httpBaseService.Delete(ApiRouts.getUrls + "/" + id)
      .subscribe(x =>
      {
        this.removeObjectWithId(this.urls, id);
      });
  }
  removeObjectWithId(arr: Url[], id: Guid) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  }
}
