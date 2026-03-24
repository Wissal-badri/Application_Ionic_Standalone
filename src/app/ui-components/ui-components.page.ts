import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon,
  IonBadge, IonAvatar, IonChip, IonGrid, IonRow, IonCol, IonList,
  IonListHeader, IonItem, IonLabel, IonNote, IonThumbnail, IonItemDivider,
  IonItemGroup, IonInput, IonTextarea, IonCheckbox, IonRadioGroup,
  IonRadio, IonToggle, IonSelect, IonSelectOption, IonDatetime, IonSearchbar,
  IonProgressBar, IonSpinner, IonAccordionGroup, IonAccordion, IonBreadcrumbs,
  IonBreadcrumb, IonSegment, IonSegmentButton, IonFab, IonFabButton,
  IonFabList, IonRange, IonText, IonSkeletonText, IonInfiniteScroll,
  IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonReorderGroup,
  IonReorder, IonActionSheet, IonAlert, IonToast, IonMenuButton,
  IonBackButton, IonButtons, IonModal, IonPopover, IonImg,
  IonItemSliding, IonItemOptions, IonItemOption, IonRippleEffect,
  IonTabBar, IonTabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, home, close, heart, settings, airplane, constructOutline, volumeMute, volumeHigh, trash, pencil } from 'ionicons/icons';

@Component({
  selector: 'app-ui-components',
  templateUrl: './ui-components.page.html',
  styleUrls: ['./ui-components.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon,
    IonBadge, IonAvatar, IonChip, IonGrid, IonRow, IonCol, IonList,
    IonListHeader, IonItem, IonLabel, IonNote, IonThumbnail, IonItemDivider,
    IonItemGroup, IonInput, IonTextarea, IonCheckbox, IonRadioGroup,
    IonRadio, IonToggle, IonSelect, IonSelectOption, IonDatetime, IonSearchbar,
    IonProgressBar, IonSpinner, IonAccordionGroup, IonAccordion, IonBreadcrumbs,
    IonBreadcrumb, IonSegment, IonSegmentButton, IonFab, IonFabButton,
    IonFabList, IonRange, IonText, IonSkeletonText, IonInfiniteScroll,
    IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonReorderGroup,
    IonReorder, IonActionSheet, IonAlert, IonToast, IonMenuButton,
    IonBackButton, IonButtons, IonModal, IonPopover, IonImg,
    IonItemSliding, IonItemOptions, IonItemOption, IonRippleEffect,
    IonTabBar, IonTabButton,
    CommonModule, FormsModule
  ]
})
export class UiComponentsPage implements OnInit {
  public rangeValue = 50;
  public inputText: string = 'stylo';
  public inputNumber: number | null = 20;
  
  constructor(private router: Router) {
    addIcons({ star, home, close, heart, settings, airplane, constructOutline, volumeMute, volumeHigh });
  }

  ngOnInit() {
  }
  
  goHome() {
    this.router.navigate(['/home']);
  }

  resetInputs() {
    this.inputText = '';
    this.inputNumber = null;
  }
}
