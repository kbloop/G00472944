import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonButtons } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [IonButtons, IonButton, IonIcon,  IonCard, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MovieCardComponent  implements OnInit {

  constructor() {
    addIcons( { heart, heartOutline} );
  }

  ngOnInit() {}

}
