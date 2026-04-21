import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
import { addIcons } from 'ionicons';
import { analyticsOutline, calculatorOutline, gameControllerOutline, swapHorizontalOutline, brushOutline, constructOutline, partlySunnyOutline, mapOutline, clipboardOutline, chatbubbleEllipsesOutline, cameraOutline, flashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule],
})
export class HomePage {
  data = {
    msg: 'Bonjour',
    name: 'SDDI4'
  };

  constructor(
    private router: Router,
    private dataTransferService: DataTransferService
  ) {
    addIcons({ analyticsOutline, calculatorOutline, gameControllerOutline, swapHorizontalOutline, brushOutline, constructOutline, partlySunnyOutline, mapOutline, clipboardOutline, chatbubbleEllipsesOutline, cameraOutline, flashOutline });
  }

  goToCalculsPage() {
    this.router.navigate(['/calculs']);
  }

  goToJeuxPage() {
    this.router.navigate(['/jeux']);
  }

  goToTransfertDataPage() {
    this.dataTransferService.setData(this.data);
    this.router.navigate(['/transfert-data']);
  }

  goToUIPage() {
    this.router.navigate(['/ui-page']);
  }

  goToUIComponents() {
    this.router.navigate(['/ui-components']);
  }

  goToWeatherPage() {
    this.router.navigate(['/weather']);
  }

  goToMapsPage() {
    this.router.navigate(['/maps']);
  }

  goToClipboardPage() {
    this.router.navigate(['/clipboard']);
  }

  goToSMSPhonePage() {
    this.router.navigate(['/sms-phone']);
  }

  goToCaptureMediaPage() {
    this.router.navigate(['/capture-media']);
  }

  goToTorchPage() {
    this.router.navigate(['/torch']);
  }
}
