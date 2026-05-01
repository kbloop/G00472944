import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {heart, search, searchCircle} from "ionicons/icons";
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { MyHttp } from '../services/my-http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar, MovieCardComponent],
})
export class HomePage {
  url = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private mhs: MyHttp) {
    addIcons( { heart, search, searchCircle });
  }

  ngOnInit() {
    this.getTrendingMovies();
  }

  getTrendingMovies() {
    this.mhs.get(this.url).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete :3')
    });
  }
}
