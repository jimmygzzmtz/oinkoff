import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  numberPlayers: any;
  winningScore: any;

  play(){
    let navigationExtras: NavigationExtras = { state: { numberPlayers: this.numberPlayers, winningScore: this.winningScore } };
    this.router.navigate(['/play'], navigationExtras);
  }

}
