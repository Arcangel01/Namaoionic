import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../services/data.service';

import { LoadingController, MenuController, PopoverController, IonSlides, IonInfiniteScroll } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  slideOptions = { initialSlide: 1, speed: 400, };

  slidesDidLoad(slides: IonSlides) { slides.startAutoplay(); }

  user: any;
  products: Observable<any>;

  categorias: Categoria[] = [
    {
      descripcion: 'Encontraras restaurantes de todo tipo',
      icons: 'restaurant',
      titulo: 'Restaurantes',
      imagen: '../../assets/img/Restaurante .png'
    },
    {
      descripcion: 'Todas las',
      icons: 'medkit',
      titulo: 'Droguerias',
      imagen: '../../assets/img/drogueria.png'
    },   
    {
      descripcion: 'Excelente',
      icons: 'wine',
      titulo: 'Bares',
      imagen: '../../assets/img/bar.png'
    },
    {
      descripcion: 'Encuentra las',
      icons: 'construct',
      titulo: 'Ferreterias',
      imagen: '../../assets/img/ferreteria.png'
    },
    {
      descripcion: '',
      icons: 'cart',
      titulo: 'Super mercados',
      imagen: '../../assets/img/supermercado.png'
    },
    {
      descripcion: '',
      icons: 'nutrition',
      titulo: 'Tiendas',
      imagen: '../../assets/img/tienda.png'
    },
    {
      descripcion: '',
      icons: 'pizza',
      titulo: 'Comidas Rapidas',
      imagen: '../../assets/img/comidarapida.png'
    },
    {
      descripcion: '',
      icons: 'bed',
      titulo: 'Hoteles',
      imagen: '../../assets/img/hotel.png'
    }
  ]

  constructor(private aFAuth: AngularFireAuth, public servicio: DataService,
              private loadingController: LoadingController, private router: Router, private menuCtrl: MenuController,
              private popo:PopoverController) {}

  loading: any;

  ngOnInit() {

    this.servicio.getContact();
    // this.images = this.servicio.getImages();

    // this.presentLoading('Iniciando...');

    // setTimeout(() => {
    //   this.loading.dismiss();
    // }, 1500);
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}

interface Categoria {
  descripcion: string,
  icons: string,
  titulo: string,
  imagen: string
}
