import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons';
import { heart, home, chevronForwardOutline, addOutline } from "ionicons/icons";
import { MyHttp } from '../services/my-http';
import { IonChip, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonAvatar, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports: [RouterLink, IonLabel, IonItem, IonAvatar, IonHeader, IonChip, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, CommonModule, IonGrid, IonRow, IonCol],
})
export class MovieDetailsComponent  implements OnInit {
  movie: any;
  credits: any;
  private url : string = 'https://api.themoviedb.org/3/movie/'; // + {movie_id}
  private creditsSuffix : string = '/credits' 
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttp) {
    addIcons( { heart, home, chevronForwardOutline, addOutline });
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.mhs.get(this.url + id).subscribe({
      next: (data) => {
        console.log(data);
        this.movie = data;
      },
      error: (e) => console.log(e),
      complete: () => console.info("Movie details loaded :D")
    });
    this.mhs.get(this.url + id + this.creditsSuffix).subscribe({
      next: (data) => {
        console.log(data);
        this.credits = data;
      }
    });
  }

}
