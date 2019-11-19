import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../shared/user.class';

import { ToastController, MenuController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(private router: Router, private menu: MenuController,
              private servicio: DataService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async onLogin(fLogin: NgForm) {
    const user = await this.servicio.onLogin(this.user);
    if (user) {
      console.log('Ingreso Valido');
      fLogin.resetForm();
      this.router.navigateByUrl('/');
    } else {
      console.log('Credenciales no validas!');
    }
  }

  ionViewDidEnter() {
   this.menu.enable(false);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }
}
