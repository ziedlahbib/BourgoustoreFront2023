import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffichcategorieComponent } from 'src/app/pages/affichcategorie/affichcategorie.component';
import { AffichcategorietypeComponent } from 'src/app/pages/affichcategorietype/affichcategorietype.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PanierComponent } from 'src/app/pages/panier/panier.component';
import { PaymentComponent } from 'src/app/pages/payment/payment.component';
import { RechercheComponent } from 'src/app/pages/recherche/recherche.component';


const routes: Routes = [
  { path: 'home',       component: HomeComponent },
  { path: 'panier',       component: PanierComponent },
  { path: 'recherche',       component: RechercheComponent },
  { path: 'artcileparcategorie',       component: AffichcategorieComponent },
  { path: 'artcileparcategorietype',       component: AffichcategorietypeComponent },
  { path: 'artcileparcategorietype/:cat/:type',       component: AffichcategorietypeComponent },
  { path: 'payer',       component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
