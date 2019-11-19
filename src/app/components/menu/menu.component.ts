import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public appPages = [
    {
      name: 'Inicio',
      url: '/tabs/tab1',
      icon: 'home'
    },
    {
      name: 'Mapa',
      url: '/tabs/tab2',
      icon: 'pin'
    },
    {
      name: 'Perfil',
      url: '/tabs/tab3',
      icon: 'contact'
    } 
  ]

  loading: any;

  constructor(private loadingController: LoadingController,private aFAuth: AngularFireAuth,private router: Router) { }

  ngOnInit() {}

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message,
      translucent: true,
      cssClass: 'custom-class custom-loading'
      // duration: 1000
    });
    return this.loading.present();

    console.log('Logout!');
  }

  onLogout() {

    this.presentLoading('Cerrando...');

    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
    console.log('Logout!');
    this.aFAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}
