import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Jwt} from "../../models/token/jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: Jwt;
  private authUrl = 'http://localhost:8084/api/authenticate';

  public  ulrBase = 'http://localhost:8084/api/v1';

  httpTokenHeader = {
    Authorization: "token"
  };

  constructor(private httpClient: HttpClient) {
    this.checkSavedToken();
  }

  generateToken(_username: string, _password: string, callBack: (token: Jwt) => void, error?: (error: any) => void) {
    this.token = null;
    let subscription = this.httpClient.post<Jwt>(this.authUrl, {
      username: _username,
      password: _password
    }).subscribe(
      value => {
        this.token = value;
        localStorage.setItem('token', JSON.stringify(value));
        callBack(this.token);
      },
      e => {
        if (error != null) {
          error(e);
        }
      }
    );
  }

  getToken() {
    return this.token;
  }

  checkSavedToken(call?: (token: Jwt) => void, error?: (e: any) => void) {
    let item = localStorage.getItem('token');
    if (item != null) {
      let t: Jwt = JSON.parse(item);
      this.httpTokenHeader.Authorization = t.token;
      this.httpClient.get(this.ulrBase + '/', {
        headers: this.httpTokenHeader
      }).subscribe(
        value => {
          if (call != null) {
            call(t);
          }
          this.token = t;
        },
        error1 => {
          this.token = null;
          if (error != null) {
            error(error1);
          }
        }
      )
    }
  }
}
