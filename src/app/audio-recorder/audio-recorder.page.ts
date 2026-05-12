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
  IonList, 
  IonItem, 
  IonLabel, 
  IonText,
  IonBadge,
  IonFabButton,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { VoiceRecorder, RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { addIcons } from 'ionicons';
import { 
  micOutline, 
  stopOutline, 
  playOutline, 
  pauseOutline, 
  playBackOutline, 
  playForwardOutline, 
  volumeMediumOutline, 
  volumeMuteOutline, 
  listOutline,
  trashOutline,
  timeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.page.html',
  styleUrls: ['./audio-recorder.page.scss'],
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
    IonList, 
    IonItem, 
    IonLabel, 
    IonText,
    IonBadge,
    IonFabButton,
    CommonModule, 
    FormsModule
  ]
})
export class AudioRecorderPage implements OnInit, OnDestroy {
  recording = false;
  recordedFiles: any[] = [];
  audioPlayer: HTMLAudioElement | null = null;
  isPlaying = false;
  currentPlayingFile: string | null = null;
  isMuted = false;
  showList = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ 
      micOutline, 
      stopOutline, 
      playOutline, 
      pauseOutline, 
      playBackOutline, 
      playForwardOutline, 
      volumeMediumOutline, 
      volumeMuteOutline, 
      listOutline,
      trashOutline,
      timeOutline
    });
  }

  async ngOnInit() {
    await this.checkPermissions();
    await this.loadFiles();
  }

  ngOnDestroy() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer = null;
    }
  }

  async checkPermissions() {
    const result = await VoiceRecorder.requestAudioRecordingPermission();
    if (result.value === false) {
      this.presentAlert('Permission refusée', 'L\'accès au micro est requis.');
    }
  }

  async startRecording() {
    if (this.recording) return;

    try {
      await VoiceRecorder.startRecording();
      this.recording = true;
    } catch (error) {
      console.error('Start recording error:', error);
      this.presentToast('Erreur lors du démarrage de l\'enregistrement');
    }
  }

  async stopRecording() {
    if (!this.recording) return;

    try {
      const result: RecordingData = await VoiceRecorder.stopRecording();
      this.recording = false;

      if (result.value && result.value.recordDataBase64) {
        const fileName = `audio_${new Date().getTime()}.wav`;
        await Filesystem.writeFile({
          path: fileName,
          data: result.value.recordDataBase64,
          directory: Directory.Data
        });
        this.presentToast('Enregistrement sauvegardé');
        await this.loadFiles();
      }
    } catch (error) {
      console.error('Stop recording error:', error);
      this.presentToast('Erreur lors de la sauvegarde');
    }
  }

  async loadFiles() {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Data
      });
      
      this.recordedFiles = result.files
        .filter(f => f.name.endsWith('.wav'))
        .map(f => {
          const timestamp = parseInt(f.name.split('_')[1].split('.')[0]);
          return {
            name: f.name,
            date: new Date(timestamp).toLocaleDateString(),
            time: new Date(timestamp).toLocaleTimeString(),
            timestamp: timestamp
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Load files error:', error);
    }
  }

  async playFile(file: any) {
    if (this.currentPlayingFile === file.name && this.audioPlayer) {
      if (this.isPlaying) {
        this.audioPlayer.pause();
        this.isPlaying = false;
      } else {
        this.audioPlayer.play();
        this.isPlaying = true;
      }
      return;
    }

    try {
      const audioFile = await Filesystem.readFile({
        path: file.name,
        directory: Directory.Data
      });

      const base64Audio = `data:audio/wav;base64,${audioFile.data}`;
      
      if (this.audioPlayer) {
        this.audioPlayer.pause();
      }

      this.audioPlayer = new Audio(base64Audio);
      this.audioPlayer.muted = this.isMuted;
      this.currentPlayingFile = file.name;
      this.isPlaying = true;

      this.audioPlayer.play();

      this.audioPlayer.onended = () => {
        this.isPlaying = false;
        this.currentPlayingFile = null;
      };

    } catch (error) {
      console.error('Play error:', error);
      this.presentToast('Erreur lors de la lecture');
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioPlayer) {
      this.audioPlayer.muted = this.isMuted;
    }
  }

  rewind() {
    if (this.audioPlayer) {
      this.audioPlayer.currentTime = Math.max(0, this.audioPlayer.currentTime - 2);
    }
  }

  forward() {
    if (this.audioPlayer) {
      this.audioPlayer.currentTime = Math.min(this.audioPlayer.duration, this.audioPlayer.currentTime + 2);
    }
  }

  async deleteFile(file: any) {
    const alert = await this.alertController.create({
      header: 'Supprimer',
      message: 'Voulez-vous supprimer cet enregistrement ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Supprimer',
          handler: async () => {
            await Filesystem.deleteFile({
              path: file.name,
              directory: Directory.Data
            });
            if (this.currentPlayingFile === file.name) {
              this.audioPlayer?.pause();
              this.audioPlayer = null;
              this.isPlaying = false;
              this.currentPlayingFile = null;
            }
            await this.loadFiles();
            this.presentToast('Enregistrement supprimé');
          }
        }
      ]
    });
    await alert.present();
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

  toggleList() {
    this.showList = !this.showList;
  }
}
