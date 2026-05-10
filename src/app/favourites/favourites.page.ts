import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { RouterLink } from '@angular/router';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import { Movie } from '../models/credits';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [RouterLink, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MovieCardComponent, IonRow, IonCol, IonGrid]
})
export class FavouritesPage implements OnInit {
  favouritesToDisplay: any;
  

  constructor(private mds: MyData, private mhs: MyHttp ) {
    addIcons({heart, home})
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getFavouritesFromStorage();
  }

  async getFavouritesFromStorage() {
    this.favouritesToDisplay = await this.mds.getAll();
    console.log(this.favouritesToDisplay);
  }

}
