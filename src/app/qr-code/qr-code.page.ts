import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonButton,
  IonIcon,
  IonText,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { addIcons } from 'ionicons';
import { qrCodeOutline, scanOutline, flashlightOutline, stopOutline, clipboardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton,
    IonButton,
    IonIcon,
    IonText,
    CommonModule, 
    FormsModule
  ]
})
export class QrCodePage implements OnInit, OnDestroy {
  isScanning = false;
  scanResult: string | null = null;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ qrCodeOutline, scanOutline, flashlightOutline, stopOutline, clipboardOutline });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.stopScan();
  }

  async startScan() {
    try {
      const granted = await this.checkPermissions();
      if (!granted) {
        this.presentAlert('Permission refusée', 'L\'accès à la caméra est nécessaire.');
        return;
      }

      this.isScanning = true;
      const result = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode]
      });

      if (result.barcodes && result.barcodes.length > 0) {
        this.scanResult = result.barcodes[0].displayValue;
        this.presentToast('Code QR détecté');
      }
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      this.isScanning = false;
    }
  }

  async stopScan() {
    this.isScanning = false;
  }

  async checkPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera === 'granted') return true;
    
    const { camera: newStatus } = await BarcodeScanner.requestPermissions();
    return newStatus === 'granted';
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  copyToClipboard() {
    if (this.scanResult) {
      navigator.clipboard.writeText(this.scanResult);
      this.presentToast('Copié dans le presse-papiers');
    }
  }
}
