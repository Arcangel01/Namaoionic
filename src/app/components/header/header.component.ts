import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo;

  constructor(private popo:PopoverController, private menuCtrl: MenuController) { }

  ngOnInit() {}
  async mostrarPopo(evento) {
    const popover = await this.popo.create({
      component: PopoverComponent,
      event: evento,
      translucent: true
    });
    return await popover.present();
  }
}
