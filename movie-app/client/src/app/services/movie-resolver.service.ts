import { Injectable } from '@angular/core';
import { Movie } from "../models/movie";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { MovieService } from "./movie.service";

@Injectable()
export class MovieResolverService implements Resolve<Movie>{

  constructor(private movieSvc: MovieService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Movie | Observable<Movie> | Promise<Movie>{
    return this.movieSvc.getMovieById(route.params.id);
}
}
