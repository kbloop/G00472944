import { DecimalPipe } from '@angular/common';
import { Component, OnInit, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonRouterLink } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { heart, heartOutline, star } from 'ionicons/icons';
import { MyData } from '../services/my-data';
import { Movie } from '../models/credits';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [ DecimalPipe, RouterLink, IonButton, IonIcon,  IonCard, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MovieCardComponent  implements OnInit {
  @Input() movie!: Movie;

  constructor(private mds: MyData) {
    addIcons( { heart, heartOutline, star} );
  }

  ngOnInit() {}

  async saveFavourite(movie:any) {
    await this.mds.set(movie.id, movie)
  }

  async removeFavourite(movie:any) {
    await this.mds.set(movie.id, movie)
  }

}
