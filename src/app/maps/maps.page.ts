import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonSearchbar, IonFab, 
  IonFabButton, IonIcon, IonSegment, IonSegmentButton, IonLabel,
  IonProgressBar, IonToast, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, remove, search, map as mapIcon, camera, contrast } from 'ionicons/icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: true,
  imports: [IonButton, 
    IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, IonButtons, IonBackButton, 
    IonSearchbar, IonFab, IonFabButton, IonIcon, 
    IonSegment, IonSegmentButton, IonLabel, IonProgressBar, IonToast
  ]
})
export class MapsPage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  
  private map!: L.Map;
  private marker!: L.Marker;
  private layers: { [key: string]: L.TileLayer } = {};
  
  searchQuery: string = '';
  isSearching: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';

  constructor() {
    addIcons({ add, remove, search, mapIcon, camera, contrast });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Robust initialization to avoid gray tiles
    this.refreshMap();
  }

  private refreshMap() {
    setTimeout(() => {
      this.initMap();
      
      // Secondary refresh after a short delay to ensure layout is stable
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 500);
    }, 300);
  }

  private initMap() {
    if (this.map) return; // Prevent double init

    // Default coordinates: Casablanca
    const center: L.LatLngExpression = [33.5731, -7.5898];

    // Initialize Map
    this.map = L.map(this.mapElement.nativeElement, {
      center: center,
      zoom: 13,
      zoomControl: false, // We use custom buttons
      attributionControl: false
    });

    // Define Layers
    this.layers['normal'] = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    });

    this.layers['satellite'] = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18
    });

    this.layers['dark'] = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20
    });

    // Set Default Layer
    this.layers['dark'].addTo(this.map);

    // Custom Blue Marker Icon
    const blueIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add Initial Marker
    this.marker = L.marker(center, { icon: blueIcon, draggable: true }).addTo(this.map);
    this.marker.bindPopup("<b>Casablanca</b>").openPopup();

    // Map Click event
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.updateMarker(e.latlng.lat, e.latlng.lng);
    });

    // Force resize multiple times to fix gray area issue (Ionic lifecycle quirk)
    const resizeObserver = new ResizeObserver(() => {
      this.map.invalidateSize();
    });
    resizeObserver.observe(this.mapElement.nativeElement);
  }

  private updateMarker(lat: number, lng: number, label: string = "Position sélectionnée") {
    const latLng = L.latLng(lat, lng);
    this.marker.setLatLng(latLng);
    this.marker.setPopupContent(`<b>${label}</b>`).openPopup();
    this.map.setView(latLng, this.map.getZoom(), { animate: true });
  }

  async onSearch() {
    if (!this.searchQuery || this.searchQuery.trim() === '') return;

    this.isSearching = true;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        this.updateMarker(lat, lon, result.display_name);
      } else {
        this.presentToast("Lieu non trouvé");
      }
    } catch (error) {
      this.presentToast("Erreur lors de la recherche");
      console.error(error);
    } finally {
      this.isSearching = false;
    }
  }

  presentToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000);
  }

  zoomIn() {
    this.map.setZoom(this.map.getZoom() + 1);
  }

  zoomOut() {
    this.map.setZoom(this.map.getZoom() - 1);
  }

  onMapTypeChange(event: any) {
    const type = event.detail.value;
    
    // Remove all layers
    Object.values(this.layers).forEach(layer => {
      if (this.map.hasLayer(layer)) {
        this.map.removeLayer(layer);
      }
    });

    // Add selected layer
    if (this.layers[type]) {
      this.layers[type].addTo(this.map);
    }
  }
}
