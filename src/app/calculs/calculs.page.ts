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
  num1?: number;
  num2?: number;
  resultat: number | string = 'RÉSULTAT';

  constructor() { }

  ngOnInit() {
  }

  effacer() {
    this.num1 = undefined;
    this.num2 = undefined;
    this.resultat = 'RÉSULTAT';
  }

  calculer(operation: string) {
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
        this.resultat = this.num2 !== 0 ? Number((this.num1 / this.num2).toFixed(2)) : 'Erreur (Div/0)';
        break;
    }
  }
}

