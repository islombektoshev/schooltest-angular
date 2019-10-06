import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) {
    tokenService.checkSavedToken(token => {
      console.log(token);
      router.navigate(['/home/centers']);
    }, error => {
      console.log('[app component]Error', error);
      router.navigate(['/signin']);
    });
  }

  ngOnInit() {
  }

}
