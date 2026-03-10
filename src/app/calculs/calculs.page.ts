import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon, IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';  
import { arrowBackOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-calculs',
  templateUrl: './calculs.page.html',
  styleUrls: ['./calculs.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon, IonInput,
    CommonModule, FormsModule
  ]
})
export class CalculsPage implements OnInit {
  num1?: number;
  num2?: number;
  activeOp: string = '';
  resultat: number | string = '—';

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, trashOutline });
  }

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }

  effacer() {
    this.num1 = undefined;
    this.num2 = undefined;
    this.activeOp = '';
    this.resultat = '—';
  }

  calculer(operation: string) {
    this.activeOp = operation;
    if (this.num1 === undefined || this.num2 === undefined) {
      this.resultat = 'Entrez des nombres';
      return;
    }
    switch (operation) {
      case '+':
        this.resultat = this.num1 + this.num2;
        break;
      case '-':
        this.resultat = this.num1 - this.num2;
        break;
      case '*':
        this.resultat = this.num1 * this.num2;
        break;
      case '/':
        this.resultat = this.num2 !== 0
          ? Number((this.num1 / this.num2).toFixed(4))
          : 'Erreur ÷ 0';
        break;
    }
  }
}
