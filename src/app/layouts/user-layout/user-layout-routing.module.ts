import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffichcategorieComponent } from 'src/app/pages/affichcategorie/affichcategorie.component';
import { AffichcategorietypeComponent } from 'src/app/pages/affichcategorietype/affichcategorietype.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PanierComponent } from 'src/app/pages/panier/panier.component';


const routes: Routes = [
  { path: 'home',       component: HomeComponent },
  { path: 'panier',       component: PanierComponent },
  { path: 'artcileparcategorie',       component: AffichcategorieComponent },
  { path: 'artcileparcategorietype',       component: AffichcategorietypeComponent },
  { path: 'artcileparcategorietype/:cat/:type',       component: AffichcategorietypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
