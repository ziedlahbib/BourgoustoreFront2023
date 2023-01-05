import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutArticleComponent } from 'src/app/pages/article-managment/ajout-article/ajout-article.component';
import { ArticleManagmentComponent } from 'src/app/pages/article-managment/article-managment.component';
import { BackofficeComponent } from 'src/app/pages/backoffice/backoffice.component';


const routes: Routes = [
  { path: 'back',       component: BackofficeComponent },
  { path: 'afficherarticle',        component: ArticleManagmentComponent },
  { path: 'ajoutarticle',        component: AjoutArticleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
