import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatbubbleEllipsesOutline, callOutline, paperPlaneOutline } from 'ionicons/icons';
import { SmsManager } from '@byteowls/capacitor-sms';

@Component({
  selector: 'app-sms-phone',
  templateUrl: './sms-phone.page.html',
  styleUrls: ['./sms-phone.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
    IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonButton, IonIcon, CommonModule, FormsModule
  ]
})
export class SmsPhonePage implements OnInit {

  constructor() {
    addIcons({ chatbubbleEllipsesOutline, callOutline, paperPlaneOutline });
  }

  ngOnInit() { }

  async openSMSManager() {
    try {
      // Pour ouvrir simplement le gestionnaire de SMS
      await SmsManager.send({
        numbers: [],
        text: ''
      });
    } catch (error) {
      console.error('Erreur SMS Manager:', error);
      // Fallback standard
      window.open('sms:', '_system');
    }
  }

  openPhoneManager() {
    // Standard way to open dialer
    window.location.href = 'tel:';
  }
}
