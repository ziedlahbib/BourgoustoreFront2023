import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SidenavComponent } from 'src/app/Component/back/sidenav/sidenav.component';
import { NavbarBackComponent } from 'src/app/Component/back/navbar-back/navbar-back.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import { BackofficeComponent } from 'src/app/pages/backoffice/backoffice.component';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { ChipModule } from 'primeng/chip';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterBackComponent } from 'src/app/Component/back/footer-back/footer-back.component';






@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidenavComponent,
    NavbarBackComponent,
    BackofficeComponent,
    FooterBackComponent
    
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    SlideMenuModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    ChipModule,
    MatSidenavModule
    
  ]
})
export class AdminLayoutModule { }
