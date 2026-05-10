import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonGrid, IonRow, IonCol, IonInput, IonList, IonItem, IonTextarea, IonNote, IonLabel, IonToggle, IonImg, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home, personCircleOutline, chevronForwardOutline, addOutline, filmOutline } from 'ionicons/icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyHttp } from '../services/my-http';
import { Credits } from '../models/credits';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonLabel, IonNote, IonItem, IonList, RouterLink, IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {
  details: any;
  credits?: Credits;
  // This is used to add more items to the lists.
  movieInc: number  = 0;
  crewInc: number = 0;
  private url : string = 'https://api.themoviedb.org/3/person/'; // + {person_id}
  private movieCreditsURL : string = 'https://api.themoviedb.org/3/person/'; // + {person_id} + '/movie_credits'
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttp) { 
    addIcons( {heart, home, personCircleOutline, chevronForwardOutline, addOutline, filmOutline} );
  }

  ngOnInit() {
    // Get the details of the specified ID from the TMDB by API HTTP Service
    const id = this.route.snapshot.paramMap.get('id');
    this.mhs.get(this.url + id).subscribe({
      next: (data) => {
        console.log(data);
        this.details = data;
      },
      error: (e) => console.log(e),
      complete: () => console.info("Details loaded")

    });

    this.mhs.get(this.movieCreditsURL + id + '/movie_credits').subscribe({
      next: (data) => {
        console.log(data);
        this.credits = data;
      },
      error: (e) => console.log(e),
      complete: () => console.info("Credits loaded")

    });
  }

  // Using the "load more" buttons to control list sizing. 
  loadMore(isLoadingMovies: boolean) {
    if(isLoadingMovies) {
      this.movieInc += 5;
    } else {
      this.crewInc += 5;
    }
  }

}
