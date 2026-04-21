import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonBackButton, IonButton, IonIcon 
} from '@ionic/angular/standalone';
import { Torch } from '@capawesome/capacitor-torch';
import { addIcons } from 'ionicons';
import { flash, flashOff, bulb } from 'ionicons/icons';

@Component({
  selector: 'app-torch',
  templateUrl: './torch.page.html',
  styleUrls: ['./torch.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
    IonBackButton, IonButton, IonIcon,
    CommonModule, FormsModule
  ]
})
export class TorchPage implements OnInit {
  public isTorchOn = false;

  constructor() {
    addIcons({ flash, 'flash-off': flashOff, bulb });
  }

  ngOnInit() {}

  async turnOn() {
    try {
      await Torch.enable();
      this.isTorchOn = true;
    } catch (error) {
      console.error('Torch ON error:', error);
    }
  }

  async turnOff() {
    try {
      await Torch.disable();
      this.isTorchOn = false;
    } catch (error) {
      console.error('Torch OFF error:', error);
    }
  }

  async toggle() {
    try {
      await Torch.toggle();
      this.isTorchOn = await this.checkStatus();
    } catch (error) {
      console.error('Torch toggle error:', error);
    }
  }

  private async checkStatus(): Promise<boolean> {
     // Note: Some plugins don't have a direct 'isSwitchedOn' method.
     // We manually track it or use a check if available.
     return !this.isTorchOn; 
  }
}
