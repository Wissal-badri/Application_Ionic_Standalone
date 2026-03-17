import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, brushOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ui-page',
  templateUrl: './ui-page.page.html',
  styleUrls: ['./ui-page.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon,
    CommonModule
  ]
})
export class UIPage implements OnInit {

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, brushOutline });
  }

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }
}
