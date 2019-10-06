import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import {CenterModel} from "../../models/center/center-model";

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  private centerUrl;
  private ulrBase;

  constructor(private http: HttpClient, private token: TokenService) {
    this.centerUrl = token.ulrBase + '/centers';
    this.ulrBase = token.ulrBase;
  }

  getCenters(next: (centers: CenterModel[]) => void) {
    this.http.get<CenterModel[]>(this.centerUrl, {
      headers: {
        'Authorization': this.token.getToken().token
      }
    }).subscribe(value => {
        next(value);
      },
      error => {
        console.log(error)
      });
  }

  getCenter(centername: string, callCenter: (center: CenterModel) => void, error?: (e: any) => void) {
    console.log(centername);
    this.http.get<CenterModel>(this.ulrBase + '/centers/' + centername, {
      headers: {
        'Authorization': this.token.getToken().token
      }
    }).subscribe(
      value => {
        callCenter(value);
      },
      error1 => {
        if (error != null) {
          error(error1);
        }
      }
    )
  }
}
