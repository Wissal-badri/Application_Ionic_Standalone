import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonInput, IonItem, IonList, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calculs',
  templateUrl: './calculs.page.html',
  styleUrls: ['./calculs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonButton, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonInput, IonItem, IonList, IonCardSubtitle]
})
export class CalculsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
