import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleManagmentComponent } from 'src/app/pages/article-managment/article-managment.component';
import { BackofficeComponent } from 'src/app/pages/backoffice/backoffice.component';


const routes: Routes = [
  { path: 'back',       component: BackofficeComponent },
  { path: 'afficherarticle',        component: ArticleManagmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
