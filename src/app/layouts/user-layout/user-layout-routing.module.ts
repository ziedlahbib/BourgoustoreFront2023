import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PanierComponent } from 'src/app/pages/panier/panier.component';


const routes: Routes = [
  { path: 'home',       component: HomeComponent },
  { path: 'panier',       component: PanierComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
