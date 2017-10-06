import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MovieService } from "../../services/movie.service";
import { ActivatedRoute } from "@angular/router";
import { AbstractComponent } from "../../models/abstract.component";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit, AbstractComponent {

  private form: FormGroup;
  private categories: string[];

  constructor(private fb: FormBuilder,  private route: ActivatedRoute, private el: ElementRef, private movieSvc: MovieService) {
    this.categories = ['Bollywood', 'Tollywood'];
  }

  ngOnInit() {

    let movieId = this.route.snapshot.params.id;
    let movie=this.route.snapshot.data['movie'];
    // this.movieSvc.getMovieById(movieId)
    //   .subscribe(
    //   movie => {
        //movie object received
        this.form = this.fb.group({
          id: [movieId],
          title: [movie.title, Validators.required],
          actors: [movie.actors, Validators.compose([Validators.required, Validators.minLength(3)])],
          directors: [movie.directors, Validators.compose([Validators.required, Validators.minLength(3)])],
          description: [movie.description, Validators.required],
          writers: [movie.writers, Validators.compose([Validators.required, Validators.minLength(3)])],
          music: [movie.music, Validators.compose([Validators.required, Validators.minLength(3)])],
          singers: [movie.singers, Validators.compose([Validators.required, Validators.minLength(3)])],
          genre: [movie.genre, Validators.required],
          year: [movie.year, Validators.compose([Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())])],
          runtime: [movie.runtime,],
          language: [movie.language, Validators.required],
          awards: [movie.awards],
          production: [movie.production, Validators.required],
          category: [movie.category, Validators.required],
          poster: [''],
          trailer: ['']
        // });
      },
      err => console.log("Error :" + err)
      )


  }


  public updateMovie() {

  }

}
