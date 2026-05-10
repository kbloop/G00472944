import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons';
import { heart, home, chevronForwardOutline, addOutline, personCircleOutline, filmOutline } from "ionicons/icons";
import { MyHttp } from '../services/my-http';
import { IonChip, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonAvatar, IonItem, IonLabel, IonList } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Credits } from '../models/credits';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonList, RouterLink, IonLabel, IonItem, IonAvatar, IonHeader, IonChip, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, CommonModule, IonGrid, IonRow, IonCol],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  credits?: Credits;
  isFav?: boolean;
  favBtnText: string = 'Add to Favourites'; 

  castInc: number  = 0;
  crewInc: number = 0;

  private url : string = 'https://api.themoviedb.org/3/movie/'; // + {movie_id}
  private creditsSuffix : string = '/credits' 
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttp, private mds: MyData) {
    addIcons( { heart, home, chevronForwardOutline, addOutline, personCircleOutline, filmOutline });
   }

  ngOnInit() {
    // Get the details for this particular movie/  
    const id = this.route.snapshot.paramMap.get('id');
    this.mhs.get(this.url + id).subscribe({
      next: (data) => {
        console.log(data);
        this.movie = data;
      },
      error: (e) => console.log(e),
      complete: () => console.info("Movie details loaded :D")
    });

    // Another API call to get the credits for this movie
    this.mhs.get(this.url + id + this.creditsSuffix).subscribe({
      next: (data) => {
        console.log(data);
        this.credits = data;
      }
    });

    // Check if the movie is a favourite
    this.checkFavs(id);
  }

  // Check if this movie is already a favourite 
  async checkFavs(id: string | null) {
    if(id === null) return;

    this.mds.get(id).then(
    (data) => {
      console.log("Checking your favourite moovys....  :)" );
      console.log(data);
      if(data == null) {
        console.log("It's not a fav")
        this.isFav = false;
        this.favBtnText = "Add To Favourites";
      } else {
        console.log("It's already a fav! You have such good taste")
        this.isFav = true;
        this.favBtnText = "Remove From Favourites"
      }
    }
    );
  }

  // Toggle the movie to our favourites via the Data service.
  async toggleFavourites() {
    if(this.isFav) {
      // It's already a favourites so we unfav it :( </3 
      console.log(`Removing ${this.movie.title} from your favourtes...`)
      await this.mds.remove(this.movie.id.toString()).then(
        () => { 
          this.checkFavs(this.movie.id.toString());
        }
      );
    } else {
      console.log(`Adding ${this.movie.title} to your favourtes...`)
      // It's not a fav so we add it to our favs <3 :)
      await this.mds.set(this.movie.id.toString(), this.movie).then(
        () => {
          this.checkFavs(this.movie.id.toString());
        }
      );
    }
  }

  // Using the "load more" buttons to control list sizing. 
  loadMore(isLoadingMovies: boolean) {
    if(isLoadingMovies) {
      this.castInc += 5;
    } else {
      this.crewInc += 5;
    }
  }

}
