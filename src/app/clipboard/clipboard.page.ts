import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonToast,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copyOutline, clipboardOutline, trashOutline, alertCircleOutline } from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput,
    IonButton, IonIcon, IonLabel, IonToast, IonButtons, IonBackButton
  ]
})
export class ClipboardPage implements OnInit {
  inputText: string = '';
  clipboardContent: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor() {
    addIcons({ copyOutline, clipboardOutline, trashOutline, alertCircleOutline });
  }

  ngOnInit() { }

  async writeToClipboard() {
    if (!this.inputText) {
      this.presentToast('Veuillez saisir du texte avant de copier', 'warning');
      return;
    }
    
    try {
      await Clipboard.write({
        string: this.inputText
      });
      this.presentToast('Copié dans le presse-papiers !', 'success');
    } catch (err) {
      this.presentToast('Erreur lors de la copie', 'danger');
      console.error('Error writing to clipboard:', err);
    }
  }

  async readFromClipboard() {
    try {
      const { value } = await Clipboard.read();
      this.clipboardContent = value;
      this.presentToast('Contenu récupéré !', 'success');
    } catch (err) {
      this.presentToast('Erreur lors de la lecture du presse-papiers', 'danger');
      console.error('Error reading from clipboard:', err);
    }
  }

  clearFields() {
    this.inputText = '';
    this.clipboardContent = '';
  }

  presentToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
