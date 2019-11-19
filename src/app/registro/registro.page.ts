import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  DataService} from '../services/data.service';
import { User } from '../shared/user.class';

import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: User = new User();

  constructor(private service: DataService, private menu: MenuController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

   async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }


  async onRegister() {
    const user = await this.service.onRegister(this.user);
    if (user) {
      this.presentToast('Registrado satisfactoriamente!');
      console.log('Registrado satisfactoriamente!');
      this.router.navigateByUrl('/login');
    }
  }

  ionViewDidEnter() {
    this.menu.enable(false);
   }
 
   ionViewWillLeave(){
     this.menu.enable(true);
   }
}
