import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon,
  IonButton, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gameController,
  trendingUp,
  trendingDown,
  trophy,
  refresh,
  list,
  checkmarkCircle,
  closeCircle,
  arrowUp,
  arrowDown,
  send,
  arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.page.html',
  styleUrls: ['./jeux.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon,
    IonButton, IonButtons,
    CommonModule, FormsModule
  ]
})
export class JeuxPage implements OnInit {

  nombreSecret: number = 0;
  nombreSaisi: string = '';
  message: string = '';
  messageType: 'superieur' | 'inferieur' | 'gagne' | 'perdu' | '' = '';
  essaisRestants: number = 5;
  jeuTermine: boolean = false;
  historique: { nombre: number; resultat: string; type: string }[] = [];

  constructor(private router: Router) {
    addIcons({
      gameController,
      trendingUp,
      trendingDown,
      trophy,
      refresh,
      list,
      checkmarkCircle,
      closeCircle,
      arrowUp,
      arrowDown,
      send,
      arrowBackOutline
    });
  }

  ngOnInit() {
    this.rejouer();
  }

  ionViewWillEnter() {
    this.rejouer();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  verifier() {
    // 1. Jeu terminé → rien faire
    if (this.jeuTermine) return;

    // 2. Valider la saisie (vide ou non-numérique)
    const nb = parseInt(this.nombreSaisi.trim(), 10);
    if (isNaN(nb)) return;

    // 3. Décrémenter les essais
    this.essaisRestants--;

    // 4. Comparer avec le nombre secret
    if (nb > this.nombreSecret) {
      this.message = 'Le nombre saisi est supérieur au nombre secret !!!';
      this.messageType = 'superieur';
      this.historique.push({ nombre: nb, resultat: 'C\'est moins !', type: 'superieur' });
    } else if (nb < this.nombreSecret) {
      this.message = 'Le nombre saisi est inférieur au nombre secret !!!';
      this.messageType = 'inferieur';
      this.historique.push({ nombre: nb, resultat: 'C\'est plus !', type: 'inferieur' });
    } else {
      // Nombre trouvé → victoire !
      this.message = 'Bravo vous avez gagné !!!!';
      this.messageType = 'gagne';
      this.historique.push({ nombre: nb, resultat: 'Trouvé !', type: 'gagne' });
      this.jeuTermine = true;
      this.nombreSaisi = '';
      return;
    }

    // 5. Plus d'essais → défaite
    if (this.essaisRestants <= 0) {
      this.essaisRestants = 0;
      this.message = `Perdu ! Le nombre secret était ${this.nombreSecret}.`;
      this.messageType = 'perdu';
      this.jeuTermine = true;
    }

    // Vider le champ après chaque tentative
    this.nombreSaisi = '';
  }

  rejouer() {
    this.nombreSecret = Math.floor(Math.random() * 100) + 1;
    this.nombreSaisi = '';
    this.message = '';
    this.messageType = '';
    this.essaisRestants = 5;
    this.jeuTermine = false;
    this.historique = [];
  }
}
