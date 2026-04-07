import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon,
  IonBadge, IonAvatar, IonChip, IonList,
  IonListHeader, IonItem, IonLabel, IonNote, IonThumbnail, IonItemDivider,
  IonItemGroup, IonInput, IonTextarea, IonCheckbox, IonRadioGroup,
  IonRadio, IonToggle, IonSelect, IonSelectOption, IonDatetime, IonSearchbar,
  IonProgressBar, IonSpinner, IonAccordionGroup, IonAccordion, IonBreadcrumbs,
  IonBreadcrumb, IonSegment, IonSegmentButton, IonFab, IonFabButton,
  IonFabList, IonRange, IonText, IonSkeletonText,
  IonRefresher, IonRefresherContent, IonReorderGroup,
  IonReorder, IonActionSheet, IonAlert, IonToast,
  IonBackButton, IonButtons, IonModal, IonPopover,
  IonItemSliding, IonItemOptions, IonItemOption, IonRippleEffect,
  IonTabBar, IonTabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  star, home, close, heart, settings, airplane, constructOutline, 
  volumeMute, volumeHigh, trash, pencil, calendar, mail, call, 
  list, statsChart, hourglass, alertCircle, informationCircle, 
  card, filter, gift, cart, code, flash, batteryCharging, 
  bluetooth, wifi, alarm, pulse, lockClosed, eyeOff, 
  shareSocial, qrCode, sunny, moon, volumeLow, 
  musicalNotes, timer, construct
} from 'ionicons/icons';

@Component({
  selector: 'app-ui-components',
  templateUrl: './ui-components.page.html',
  styleUrls: ['./ui-components.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon,
    IonBadge, IonAvatar, IonChip, IonList,
    IonListHeader, IonItem, IonLabel, IonNote, IonThumbnail, IonItemDivider,
    IonItemGroup, IonInput, IonTextarea, IonCheckbox, IonRadioGroup,
    IonRadio, IonToggle, IonSelect, IonSelectOption, IonDatetime, IonSearchbar,
    IonProgressBar, IonSpinner, IonAccordionGroup, IonAccordion, IonBreadcrumbs,
    IonBreadcrumb, IonSegment, IonSegmentButton, IonFab, IonFabButton,
    IonFabList, IonRange, IonText, IonSkeletonText,
    IonRefresher, IonRefresherContent, IonReorderGroup,
    IonReorder, IonActionSheet, IonAlert, IonToast,
    IonBackButton, IonButtons, IonModal, IonPopover,
    IonItemSliding, IonItemOptions, IonItemOption, IonRippleEffect,
    IonTabBar, IonTabButton,
    CommonModule, FormsModule
  ]
})
export class UiComponentsPage implements OnInit {
  public rangeValue = 50;
  public inputText: string = 'stylo';
  public inputNumber: number | null = 20;
  // Stopwatch variables
  stopwatchTime: number = 0;
  stopwatchInterval: any;
  isStopwatchRunning: boolean = false;

  constructor(private router: Router) { 
    addIcons({ 
      star, home, close, heart, settings, airplane, constructOutline, 
      volumeMute, volumeHigh, trash, pencil, calendar, mail, call, 
      list, statsChart, hourglass, alertCircle, informationCircle, 
      card, filter, gift, cart, code, flash, batteryCharging, 
      bluetooth, wifi, alarm, pulse, lockClosed, eyeOff, 
      shareSocial, qrCode, sunny, moon, volumeLow, 
      musicalNotes, timer, construct
    });
  }

  ngOnInit() {
  }

  // Stopwatch Logic
  toggleStopwatch() {
    if (this.isStopwatchRunning) {
      clearInterval(this.stopwatchInterval);
      this.isStopwatchRunning = false;
    } else {
      this.isStopwatchRunning = true;
      this.stopwatchInterval = setInterval(() => {
        this.stopwatchTime++;
      }, 1000);
    }
  }

  resetStopwatch() {
    clearInterval(this.stopwatchInterval);
    this.stopwatchTime = 0;
    this.isStopwatchRunning = false;
  }

  formatStopwatch(): string {
    const hrs = Math.floor(this.stopwatchTime / 3600);
    const mins = Math.floor((this.stopwatchTime % 3600) / 60);
    const secs = this.stopwatchTime % 60;
    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }

  private pad(val: number): string {
    return val < 10 ? '0' + val : val.toString();
  }
  
  goHome() {
    this.router.navigate(['/home']);
  }

  resetInputs() {
    this.inputText = '';
    this.inputNumber = null;
  }
}
