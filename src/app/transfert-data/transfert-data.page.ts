import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, swapHorizontalOutline } from 'ionicons/icons';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-transfert-data',
  templateUrl: './transfert-data.page.html',
  styleUrls: ['./transfert-data.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon,
    CommonModule
  ]
})
export class TransfertDataPage implements OnInit {
  data: any = null;

  constructor(
    private router: Router,
    private dataTransferService: DataTransferService
  ) {
    addIcons({ arrowBackOutline, swapHorizontalOutline });
  }

  ngOnInit() {
    this.data = this.dataTransferService.getData();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
