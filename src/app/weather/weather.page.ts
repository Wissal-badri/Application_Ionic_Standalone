import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, 
  IonSearchbar, IonButton, IonGrid, IonRow, IonCol, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  thermometer, speedometer, water, compass, partlySunny, 
  leaf, cloud, eye, location, navigate,
  thermometerOutline, trendingDownOutline, trendingUpOutline,
  downloadOutline, leafOutline, navigateOutline, waterOutline,
  cloudOutline, eyeOutline, locationOutline, sunnyOutline, cloudyNightOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, 
    IonSearchbar, IonButton, IonGrid, IonRow, IonCol, IonIcon,
    CommonModule, FormsModule, HttpClientModule
  ]
})
export class WeatherPage implements OnInit {
  public city: string = '';
  // La clé API est maintenant chargée depuis l'environnement pour la sécurité
  public apiKey: string = environment.weatherApiKey;
  public weatherData: any = null;
  public errorMsg: string = '';

  constructor(private http: HttpClient) { 
    // Icons setup for the UI
    addIcons({ 
      thermometer, speedometer, water, compass, partlySunny, 
      leaf, cloud, eye, location, navigate,
      'thermometer-outline': thermometerOutline,
      'trending-down-outline': trendingDownOutline,
      'trending-up-outline': trendingUpOutline,
      'download-outline': downloadOutline,
      'leaf-outline': leafOutline,
      'navigation-outline': navigateOutline,
      'water-outline': waterOutline,
      'cloud-outline': cloudOutline,
      'eye-outline': eyeOutline,
      'location-outline': locationOutline,
      'sunrise-outline': sunnyOutline,
      'sunset-outline': cloudyNightOutline
    });
  }

  ngOnInit() {}

  getWeather() {
    if (!this.city.trim()) return;
    
    this.errorMsg = '';
    // Call the OpenWeather API with units metric (Celcius) and fr language
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=fr`;
    
    this.http.get(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(data); // Log pour analyse
      },
      error: (err) => {
        this.weatherData = null;
        if (err.status === 404) {
          this.errorMsg = "Ville introuvable. Veuillez vérifier l'orthographe de la ville.";
        } else if (err.status === 401) {
          this.errorMsg = "Clé API invalide. Attendez quelques minutes si vous venez de l'activer.";
        } else {
          this.errorMsg = "Une erreur serveur est survenue avec l'API OpenWeatherMap.";
        }
      }
    });
  }

  // Helper method pour transformer l'heure UNIX en texte lisible pour sunrise/sunset
  formatTime(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit'
    });
  }
}
