import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../service/token/token.service";
import {Router} from "@angular/router";
import {error} from "util";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private username: string;
  private password: string;


  private message:string = '';

  constructor(private token: TokenService, private router: Router) {
  }

  ngOnInit() {
  }

  onSignInButtonClick() {
    this.token.generateToken(this.username, this.password, t => {
      this.onSignedIn();
    }, e => {
      this.onSignInFailure()
    });
  }

  onSignedIn(){
    this.router.navigate(['/home']);
  }

  onSignInFailure(){
    this.message='Cannot signed in';
  }

}
