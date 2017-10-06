import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

import { Movie } from "../models/movie";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class MovieService {

  readonly API_URL: string = "http://localhost:5000/api/movies";
  private usernamePassword:Map<string,string> = new Map([["jayu", "jayu"], ["jayu", "yogesh"]])
  constructor(private http: Http) {

  }

  public getMovies(): Observable<Movie[]> {

    return this.http.get(this.API_URL)
      .map(res => res.json())
      .catch(err => Observable.throw(err))
  }

  public add(data: FormData): Observable<any> {
    return this.http.post(this.API_URL, data)
      .map(res => res.json())
      .catch(err => Observable.throw(err))
  }
  public getMovieById(id:string):Observable<Movie>{
    var url=`${this.API_URL}/${id}`;
    return this.http.get(url)
    .map(res => res.json())
    .catch(err => Observable.throw(err));
  }


}