

import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AbstractComponent } from "../models/abstract.component";

@Injectable()
export class DeactivateGuardService implements CanDeactivate<AbstractComponent>{
    canDeactivate(component: AbstractComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return confirm('Are you sure you want to leave?');
    }



}


