import { Component, OnInit, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonRouterLink } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';


@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [RouterLink, IonButton, IonIcon,  IonCard, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MovieCardComponent  implements OnInit {
  @Input() movie: any;

  constructor() {
    addIcons( { heart, heartOutline} );
  }

  ngOnInit() {}

}
