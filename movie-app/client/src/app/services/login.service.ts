import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { Observable } from "rxjs/Observable";
import { LocalStorageService } from "ngx-webstorage/dist/services";
import 'rxjs/add/observable/of';



@Injectable()
// export class LoginService {
//     private usernamePassword: Map<string, string> = new Map([["jayu", "jayu"], ["jayu", "yogesh"]])
//     constructor() { }
//     public validateLogin(data: User) {
//         if (this.usernamePassword.has(data.username)) {
//             if (this.usernamePassword.get(data.username) === data.password) {
//                 return true;
//             }
//         }
//         else return false;
//     }

// }


export class LoginService {
    private users: any[];
    constructor(
        private localStorageSvc: LocalStorageService
    ) {
        this.users = [
            { username: 'jayu', password: 'jayu' },
            { username: 'yogesh', password: 'yogesh' },
            { username: 'shashank', password: 'shashank' }

        ]
    }
    public validateLogin(data: User) {

        for (let item of this.users) {
            if (item.username === data.username && item.password === data.password) {

                return true
            }

        }
        return false
    }

    public isValidUser(): Observable<boolean> {
        let username = this.localStorageSvc.retrieve('username');
        if (username) {
            return Observable.of(true);
        } else return Observable.of(false); //OF: input value to Observable value
    }

    public getUserName(): string {
        let username = this.localStorageSvc.retrieve('username');
        return username ? username : undefined;
    }

    public logout(){
        this.localStorageSvc.clear('username')
    }

}