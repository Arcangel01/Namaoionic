import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../services/data.service';
import { LoadingController, MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private aFAuth: AngularFireAuth, private servicio: DataService,
    private loadingController: LoadingController, private router: Router, private menuCtrl: MenuController,
    private popo:PopoverController) {}

    loading: any;

    ngOnInit() {
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

}
