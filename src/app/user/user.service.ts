import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../service/token/token.service";
import {UserModel} from "../models/user/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private token: TokenService) {
  }

  getUser(): UserModel {
    let _user: UserModel;
    let subscription = this.httpClient.get<UserModel>(this.token.ulrBase).subscribe(
      user => {
        _user = user;
      },
      e => {
        throw new Error(e)
      }
    );
    return _user;
  }

}
