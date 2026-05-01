import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {heart, search, searchCircle} from "ionicons/icons";
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar, MovieCardComponent],
})
export class HomePage {
  constructor() {
    addIcons( { heart, search, searchCircle });
  }
}
