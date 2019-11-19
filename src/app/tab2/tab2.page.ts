import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../services/data.service';
import { LoadingController, MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverComponent } from '../components/popover/popover.component';

declare var mapboxgl: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  constructor(private aFAuth: AngularFireAuth, private servicio: DataService,
    private loadingController: LoadingController, private router: Router, private menuCtrl: MenuController,
    private popo:PopoverController) {}

    loading: any;

    coordenadas: [
      {
        long: -75.5681967,
        lat: 6.3020568
      },
      { 
        long: -75.56623859165371,
        lat: 6.299078935068039
      },
      { 
        long: -75.57171163088182,
        lat: 6.302367928941763
      }
    ]
    
    ngOnInit() {
    this.presentLoading('Cargando...');

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

    ngAfterViewInit() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXJjYW5nZWwxMCIsImEiOiJjazJtMndyN3QwZG5iM21uMnVseXFtOTUxIn0.BK7QdQLnZg0Smo-JeWmx3A';
         
      const layerIDs = []; // Will contain a list used to filter against.
      const filterInput = document.getElementById('filter-input');
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [-75.567, 6.217], // starting position
        zoom: 13, // starting zoom
        pitch: 45,
        bearing: -17.6,
        antialias: true
        });

        map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          trackUserLocation: true
          }));

        map.on('load', () => {

          map.resize();

          // Probando el JSON

          const places = {
            "type": "FeatureCollection",
            "features": [{
            "type": "Feature",
            "properties": {
            "icon": "restaurant"
            },
            "geometry": {
            "type": "Point",
            "coordinates": [-75.57146361715063, 6.302418637954631]
            }
            }, {
            "type": "Feature",
            "properties": {
            "icon": "bar"
            },
            "geometry": {
            "type": "Point",
            "coordinates": [-75.56915666615181, 6.302461909947922]
            }
            }, {
            "type": "Feature",
            "properties": {
            "icon": "bar"
            },
            "geometry": {
            "type": "Point",
            "coordinates": [-75.56684464745452, 6.301390093194712]
            }
            }, {
            "type": "Feature",
            "properties": {
            "icon": "bar"
            },
            "geometry": {
            "type": "Point",
            "coordinates": [-75.57047462965687, 6.300361165783329]
            }
            }, {
            "type": "Feature",
            "properties": {
            "icon": "restaurant"
            },
            "geometry": {
            "type": "Point",
            "coordinates": [-75.56780555935218, 6.304032116403704]
            }
            },
            {
            "type": "Feature",
            "properties": {
            "icon": "restaurant"
            },
            "geometry": {
            "type": "Point",
            "coordinates": [-75.5660144302432, 6.302724140299176]
            }
            }]
            };
             
            map.addSource('places', {
            "type": "geojson",
            "data": places
            });
             
            places.features.forEach(function(feature) {
              const symbol = feature.properties['icon'];
              const layerID = 'poi-' + symbol;
             
            // Add a layer for this symbol type if it hasn't been added already.
            if (!map.getLayer(layerID)) {
            map.addLayer({
            "id": layerID,
            "type": "symbol",
            "source": "places",
            "layout": {
            "icon-image": symbol + "-15",
            "icon-allow-overlap": true,
            "text-field": symbol,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-size": 11,
            "text-transform": "uppercase",
            "text-letter-spacing": 0.05,
            "text-offset": [0, 1.5],
            
            },
            "paint": {
            "text-color": "#202",
            "text-halo-color": "#fff",
            "text-halo-width": 2
            },
            "filter": ["==", "icon", symbol]
            });
             
            layerIDs.push(layerID);
            }
            });
             
            filterInput.addEventListener('keyup', function(e) {
            // If the input value matches a layerID set
            // it's visibility to 'visible' or else hide it.
            let value = e.target;
            layerIDs.forEach(function(layerID) {
            map.setLayoutProperty(layerID, 'visibility',
            layerID.indexOf(value) > -1 ? 'visible' : 'none');
            });
            });

            var popup = new mapboxgl.Popup({offset: 25})
            .setText('Aqui estudiamos nosotros señores!');
        
          // GeoCoder
          new mapboxgl.Marker()
          .setLngLat([-75.5681967,6.3020568])
          .setPopup(popup)
          .addTo(map);

          // Insert the layer beneath any symbol layer.
          var layers = map.getStyle().layers;
           
          var labelLayerId;
          for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
          }
          }
           
          map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
          'fill-extrusion-color': '#aaa',
           
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
          "interpolate", ["linear"], ["zoom"],
          15, 0,
          15.05, ["get", "height"]
          ],
          'fill-extrusion-base': [
          "interpolate", ["linear"], ["zoom"],
          15, 0,
          15.05, ["get", "min_height"]
          ],
          'fill-extrusion-opacity': .6
          }
          }, labelLayerId);
          });    
    }

    async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
    message,
    translucent: true,
    cssClass: 'custom-class custom-loading'
    // duration: 1000
    });
    return this.loading.present();

    }

    toggleMenu() {
    this.menuCtrl.toggle();
    }

    async mostrarPopo(evento) {
    const popover = await this.popo.create({
    component: PopoverComponent,
    event: evento,
    translucent: true
    });
    return await popover.present();
    }

}
