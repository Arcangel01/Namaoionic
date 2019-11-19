import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.class';

import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productos: Array<Object>;

  public isLogged: any = false;

  constructor(private afAuth: AngularFireAuth, private toastController: ToastController, private http: HttpClient) {
    afAuth.authState.subscribe( user => (this.isLogged = user));
  }

  // toast
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      color: 'danger',
      duration: 1000
    });
    toast.present();
  }

  // Login
  async onLogin(user: User) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.presentToast('Correo o contraseña no validas!');
    }
  }

  // Registro
  async onRegister(user: User) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.presentToast('No se registro!');
    }
  }

  // Consumo de productos
  getProducts() {
    return this.http.get('http://localhost:3000/products');
  }

  url = 'http://localhost:3000/products';
  getContact() {

    this.http.get('http://localhost:3000/products').toPromise()
    .then(
      res=>{
        this.productos = res as Array<Object>;
      }
    )
    }
}
