import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonBackButton, IonIcon, IonCard, IonCardContent,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, videocam, image, playCircle } from 'ionicons/icons';

@Component({
  selector: 'app-capture-media',
  templateUrl: './capture-media.page.html',
  styleUrls: ['./capture-media.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
    IonBackButton, IonIcon, IonCard, IonCardContent,
    IonGrid, IonRow, IonCol, CommonModule, FormsModule
  ]
})
export class CaptureMediaPage implements OnInit {
  public photo: string | undefined;
  public videoUrl: string | undefined;

  constructor() {
    addIcons({ camera, videocam, image, 'play-circle': playCircle });
  }

  ngOnInit() {}

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      this.photo = image.webPath;
      this.videoUrl = undefined;
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  async recordVideo() {
    // We use the cordova-plugin-media-capture which is available in navigator.device.capture
    const nav = navigator as any;
    if (nav.device && nav.device.capture) {
      nav.device.capture.captureVideo(
        (mediaFiles: any[]) => {
          if (mediaFiles.length > 0) {
            this.videoUrl = mediaFiles[0].fullPath;
            this.photo = undefined;
            alert('Vidéo enregistrée avec succès !');
          }
        },
        (error: any) => {
          console.error('Video capture error:', error);
        },
        { limit: 1 }
      );
    } else {
      alert("La capture vidéo n'est disponible que sur un appareil réel avec le plugin Media Capture.");
    }
  }
}
