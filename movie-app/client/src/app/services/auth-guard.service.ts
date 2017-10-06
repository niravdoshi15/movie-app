import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LocalStorageService } from "ngx-webstorage/dist/app";

@Injectable()
export class AuthGuardService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.localStorageSvc.retrieve('username')) {
            return true;
        }
        else return false;
    }
    constructor(private localStorageSvc: LocalStorageService) {

    }



}
