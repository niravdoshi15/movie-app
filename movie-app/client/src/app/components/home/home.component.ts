import { Component} from '@angular/core';
import { MovieService } from "../../services/movie.service";
import { Movie } from "../../models/movie";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private movies:Movie[];
  private moviesObsvr:any;   //1 method using async 
  constructor(private movieSvc:MovieService) {
    this.moviesObsvr=this.movieSvc.getMovies();  //2 method using async 
  //   this.movieSvc.getMovies()     //1 method using subscribe
  //  .subscribe(                                      

  //    data=>{
  //      console.log(data)
  //    this.movies=data
  //    },
  //    err=>console.log(err)
  //  )
  }


}
