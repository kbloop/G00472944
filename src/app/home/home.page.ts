import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, search, searchCircle} from "ionicons/icons";
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { MyHttp } from '../services/my-http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MyData } from '../services/my-data';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCol, IonRow, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSearchbar, MovieCardComponent, CommonModule, IonGrid],
})
export class HomePage {
  url = 'https://api.themoviedb.org/3/movie/popular';
  moviesToShow = [];
  searchTerm: string = '';
  searchURL = 'https://api.themoviedb.org/3/search/movie?query=';
  searchMovies = [];
  trendingBtnColor: string = "primary";
  topRatedBtnColor: string = "light";
  upcomingBtnColor: string = "light";
  playingBtnColor: string = "light";
  
  constructor(private mhs: MyHttp, private mds: MyData, private route: ActivatedRoute) {
    addIcons( { heart, search, searchCircle });
  }
  
  ngOnInit() {
    // On page load we show trending movies.
    this.getTrendingMovies();
  }
  
  getTrendingMovies() {
    this.url = 'https://api.themoviedb.org/3/movie/popular';
    // Toggle the color of the buttons to mimic a tab (don't want to use ion-tab, that's more for like page navigation)
    this.trendingBtnColor = "primary";
    this.topRatedBtnColor = "light";
    this.upcomingBtnColor = "light";
    this.playingBtnColor = "light";
    
    // Trending movies API call
    this.mhs.get(this.url).subscribe({
      next: (data) => {
        console.log(data);
        this.moviesToShow = data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('Trending movies loading complete :3')
    });
  }
  
  getTopRatedMovies() {
    this.url = 'https://api.themoviedb.org/3/movie/top_rated';
    // Toggle the color of the buttons to mimic a tab
    this.trendingBtnColor = "light";
    this.topRatedBtnColor = "primary";
    this.upcomingBtnColor = "light";
    this.playingBtnColor = "light";
    // Trending movies API call
    this.mhs.get(this.url).subscribe({
      next: (data) => {
        console.log(data);
        this.moviesToShow = data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('Trending movies loading complete :3')
    });
  }
  
  getPlayingMovies() {
    this.url = 'https://api.themoviedb.org/3/movie/now_playing';
    // Toggle the color of the buttons to mimic a tab
    this.trendingBtnColor = "light";
    this.topRatedBtnColor = "light";
    this.upcomingBtnColor = "light";
    this.playingBtnColor = "primary";
    // Trending movies API call
    this.mhs.get(this.url).subscribe({
      next: (data) => {
        console.log(data);
        this.moviesToShow = data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('Trending movies loading complete :3')
    });
  }

  getUpcomingMovies() {
    this.url = 'https://api.themoviedb.org/3/movie/upcoming';
    // Toggle the color of the buttons to mimic a tab
    this.trendingBtnColor = "light";
    this.topRatedBtnColor = "light";
    this.upcomingBtnColor = "primary";
    this.playingBtnColor = "light";
    // Trending movies API call
    this.mhs.get(this.url).subscribe({
      next: (data) => {
        console.log(data);
        this.moviesToShow = data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('Trending movies loading complete :3')
    });
  }

  searchForMovies() {
    // If no searchterm is entered we will show them trending movies instead!
    // Trimming the string so and spaces don't count as a search term
    // Return here stop it continuing on with API call 
    if(this.searchTerm.trim().length == 0) return this.getTrendingMovies();

    // API call with our URL + whatever the search term is :)
    this.mhs.get(this.searchURL + this.searchTerm).subscribe({
      next: (data) => {
        console.log(data);
        this.moviesToShow = data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('Movie search is finished :D Hope you have found what you seek')
    });
    console.log(`Value of searchbar is ${ this.searchTerm }`);
  }
}
