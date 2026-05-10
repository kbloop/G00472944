import { DecimalPipe, NgIf } from '@angular/common';
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
  imports: [DecimalPipe, RouterLink, IonButton, IonIcon, IonCard, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, NgIf]
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  // Check Is the movie already favourited? set it to false initially
  isFav: boolean = false;

  constructor(private mds: MyData) {
    addIcons({ heart, heartOutline, star });
  }

  ngOnInit() {
    this.checkFavs(this.movie);
  }

  async saveFavourite(movie: any) {
    await this.mds.set(movie.id.toString(), movie).then(
      () => {
        this.checkFavs(this.movie);
      }
    )
  }

  async removeFavourite(movie: any) {
    await this.mds.remove(movie.id.toString()).then(
      () => {
        this.checkFavs(this.movie);
      }
    )
  }

  // Check if this movie is already a favourite 
  async checkFavs(movie: any) {
    // Compare if it's null or not and then inverted that boolean value
    this.isFav = !(await this.mds.get(movie.id.toString()) == null);
    if (this.isFav) console.log(`spotted your fav!! ${movie.title}`);
  }

}
