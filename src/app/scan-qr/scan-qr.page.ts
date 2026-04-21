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
  AlertController
} from '@ionic/angular/standalone';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { addIcons } from 'ionicons';
import { qrCodeOutline, scanOutline, flashlightOutline, stopOutline, clipboardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
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
    CommonModule, 
    FormsModule
  ]
})
export class ScanQrPage implements OnInit, OnDestroy {
  isScanning = false;
  scanResult: string | null = null;

  constructor(private alertController: AlertController) {
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
        this.presentAlert('Permission refusée', 'L\'accès à la caméra est nécessaire pour scanner des codes QR.');
        return;
      }

      this.isScanning = true;
      const result = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode]
      });

      if (result.barcodes && result.barcodes.length > 0) {
        this.scanResult = result.barcodes[0].displayValue;
      }
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      this.isScanning = false;
    }
  }

  async stopScan() {
    // Non nécessaire avec BarcodeScanner.scan() car il s'arrête tout seul
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

  copyToClipboard() {
    if (this.scanResult) {
      navigator.clipboard.writeText(this.scanResult);
      // Optionnel: toast de confirmation
    }
  }
}
