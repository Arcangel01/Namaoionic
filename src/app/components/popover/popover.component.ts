import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  loading: any;

  constructor(private router: Router, private aFAuth: AngularFireAuth, private popo: PopoverController,
              private loadingController: LoadingController) { }

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
    this.popo.dismiss();
    console.log('Logout!');
    this.aFAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}
