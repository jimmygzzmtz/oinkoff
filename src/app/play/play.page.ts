import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  result1 = "snouter";
  result2 = "snouter";

  image1 = "./assets/images/" + this.result1 + ".png";
  image2 = "./assets/images/" + this.result2 + ".png";

  score = 0;

  currentPlayer = 0;

  players: any = [];
  numberOfPlayers = 0;
  winningScore = 0;

  constructor(private route: ActivatedRoute, private router: Router, private animationCtrl: AnimationController, public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.numberOfPlayers = (this.router.getCurrentNavigation().extras.state.numberPlayers);
        this.winningScore = (this.router.getCurrentNavigation().extras.state.winningScore);
        for(var i = 0; i < this.numberOfPlayers; i++){
          this.players.push({
            name: "Player " + (i+1) + "",
            score: 0
          })
        }
      }
    });

  }

  ngOnInit() {
  }

  getResult(){
    let rand = (Math.random() * 100);
    
    if (rand < 34.9){
      return "side_no_dot";
    }
    else if (rand < 34.9 + 30.2){
      return "side_dot";
    }
    else if (rand < 34.9 + 30.2 + 22.4){
      return "razorback";
    }
    else if (rand < 34.9 + 30.2 + 22.4){
      return "razorback";
    }
    else if (rand < 34.9 + 30.2 + 22.4 + 8.8){
      return"trotter";
    }
    else if (rand < 34.9 + 30.2 + 22.4 + 8.8 + 3.0){
      return "snouter";
    }
    else if (rand < 34.9 + 30.2 + 22.4 + 8.8 + 3.0 + 0.61){
      return "leaning_jowler";
    }
  }

  async roll(){

    this.image1 = "./assets/shapes.svg";
    this.image2 = "./assets/shapes.svg";

    const animation1: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#image1'))
    .duration(1500)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);

    animation1.play();

    const animation2: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#image2'))
    .duration(1500)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);

    await animation2.play();

    this.result1 = this.getResult();
    this.image1 = "./assets/images/" + this.result1 + ".png";

    this.result2 = this.getResult();
    this.image2 = "./assets/images/" + this.result2 + ".png";

    this.getScore();
    
  }

  getIndividualScore(pigValue){
    if(pigValue == "side_dot" || pigValue == "side_no_dot"){
      return 0;
    }
    if(pigValue == "razorback" || pigValue == "trotter"){
      return 5;
    }
    if(pigValue == "snouter"){
      return 10;
    }
    if(pigValue == "leaning_jowler"){
      return 15;
    }
  }

  getScore(){
    if ((this.result1 == "side_dot" && this.result2 == "side_dot") || (this.result1 == "side_no_dot" && this.result2 == "side_no_dot")){
      this.score += 1;
    }
    else if ((this.result1 == "razorback" && this.result2 == "razorback") || (this.result1 == "trotter" && this.result2 == "trotter")){
      this.score += 20;
    }
    else if (this.result1 == "snouter" && this.result2 == "snouter"){
      this.score += 40;
    }
    else if (this.result1 == "leaning_jowler" && this.result2 == "leaning_jowler"){
      this.score += 60;
    }
    else if ((this.result1 == "side_dot" && this.result2 == "side_no_dot") || (this.result1 == "side_no_dot" && this.result2 == "side_dot")){
      this.score = 0;
      this.players[this.currentPlayer].score = 0;
      this.pass();
    }
    else{
      this.score += this.getIndividualScore(this.result1) + this.getIndividualScore(this.result2);
    }
  }

  async pass(){
    this.players[this.currentPlayer].score += this.score;
    if (this.players[this.currentPlayer].score >= this.winningScore){
      const alert = await this.alertController.create({
        header: "Winner",
        message: "The winner is Player " + (this.currentPlayer+1) + "!",
        buttons: [
          {
              text: 'OK',
              handler: data => {
                this.router.navigate(['/home']);
              }
          }
      ]
      });
  
      await alert.present();
    }
    this.score = 0;
    this.currentPlayer += 1;
    if(this.currentPlayer == this.numberOfPlayers){
      this.currentPlayer = 0;
    }
    const alert = await this.alertController.create({
      header: "Next Turn",
      message: "Player " + (this.currentPlayer+1) + "'s turn",
      buttons: [
        {
            text: 'OK'
        }
    ]
    });

    await alert.present();
  }

}
