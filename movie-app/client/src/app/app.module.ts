import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import {Ng2Webstorage} from 'ngx-webstorage'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MovieRouteModule } from "./modules/movie-route/movie-route.module";
import { MovieService } from "./services/movie.service";
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { MovieResolverService } from "./services/movie-resolver.service";
import { LoginComponent } from './components/login/login.component';

import { LoginService } from "./services/login.service";
import { DefaultImagePipe } from './pipes/default-image.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AddMovieComponent,
    EditMovieComponent,
    LoginComponent,
    DefaultImagePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MovieRouteModule,
    Ng2Webstorage.forRoot({prefix:'movieapp',separator:'/',caseSensitive:false})
  ],
  providers: [
    MovieService,
    MovieResolverService,
    LoginService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
