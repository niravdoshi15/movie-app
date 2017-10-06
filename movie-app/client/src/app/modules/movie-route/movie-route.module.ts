import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from "../../components/home/home.component";
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { AddMovieComponent } from "../../components/add-movie/add-movie.component";
import { EditMovieComponent } from "../../components/edit-movie/edit-movie.component";
import { MovieResolverService } from "../../services/movie-resolver.service";
import { AuthGuardService } from "../../services/auth-guard.service";
import { DeactivateGuardService } from "../../services/deactivate-guard.service";
import { LoginComponent } from "../../components/login/login.component";


const routes:Routes=[
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'add',
    component:AddMovieComponent,
    canActivate:[AuthGuardService],
    canDeactivate:[DeactivateGuardService]
  },
  {
    path:'edit/:id',
    component:EditMovieComponent,
    resolve:{
      movie:MovieResolverService
    }
  },
  {
    path:'**',
    component:NotFoundComponent
  }

];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: [
  

  ],
  providers:[
    MovieResolverService,
    AuthGuardService,
    DeactivateGuardService
  ]
})
export class MovieRouteModule { }
