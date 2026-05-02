import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {heart, search, searchCircle} from "ionicons/icons";
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { MyHttp } from '../services/my-http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar, MovieCardComponent, CommonModule],
})
export class HomePage {
  url = 'https://api.themoviedb.org/3/movie/popular';
  trendingMovies = [];
  constructor(private mhs: MyHttp, private route: ActivatedRoute) {
    addIcons( { heart, search, searchCircle });
  }

  ngOnInit() {
    this.getTrendingMovies();
  }

  getTrendingMovies() {
    this.mhs.get(this.url).subscribe({
      next: (data) => {
        console.log(data);
        this.trendingMovies = data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete :3')
    });
  }
}
