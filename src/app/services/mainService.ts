import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()

export class MainService {

  constructor(private http: HttpClient) {}

  sampleApi(){
    return this.http.get('https://api.myjson.com/bins/u1h8p').map((response) => {
      return response;
    }).catch( (err) => this.handleError(err));
  }
  private handleError (error) {
    return Observable.throw(error);
  }

}
