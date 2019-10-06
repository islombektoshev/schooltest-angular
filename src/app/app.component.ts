import {Component} from '@angular/core';
import {TokenService} from "./service/token/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schooltestapp';

  constructor(tokenService: TokenService, private router: Router) {
    if (tokenService.getToken() == null && (location.pathname.toLowerCase() != '/home' || location.pathname.toLowerCase() != '/signin')) {
      router.navigate(['/home']);
    }
  }
}
