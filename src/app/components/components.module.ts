import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { PopoverComponent } from './popover/popover.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PopoverComponent
  ],
  entryComponents: [
    PopoverComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    PopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
