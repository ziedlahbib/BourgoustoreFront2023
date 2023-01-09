import { AfterContentInit, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Article } from 'src/app/model/article.model';
import { AffichcategorieComponent } from 'src/app/pages/affichcategorie/affichcategorie.component';
import { ArticleServiceService } from 'src/app/service/article-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  articles:Article[];
  nom="zied"
  items: MenuItem[] = [];
  item: MenuItem[] = [];
  constructor(private cs:CommandeServiceService,private articleserveice:ArticleServiceService) {
    this.cs.cartSubject.subscribe(
        (data)=>{
            this.cartItem=data;
        }
    );
   }

  ngOnInit(): void {
    
    this.cartItemFunc();
    
    this.items = [
      {
          label:'home',
          icon:'pi pi-home',
          routerLink:'/home',

      },
      {
          label:'Univers Gaming',
          items:[
              {
                  label:'Console de jeux',    
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Console_de_jeux");
           
                  },
                  routerLink:'/artcileparcategorietype',
                                
              },
              {
                  label:'unité Gaming',
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Unité_Gaming");
           
                  },
                  routerLink:'/artcileparcategorietype',

              },
              {
                  label:'péréphériqe Gaming',
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Perephérique_pc_gaming");
           
                  },
                  routerLink:'/artcileparcategorietype',
  
              },
              {
                  label:'Composant PC Gaming',
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Composant_PC_Gaming");
           
                  },
                  routerLink:'/artcileparcategorietype',

              },
              {
                label:'PC Portable',
                command: (event) => {
                    this.affichcattype("Univers_Gaming","PC_Portable");
           
                },
                routerLink:'/artcileparcategorietype',

            },

          ]
      },
      {
          label:'Univers Informatique', 
          items:[
              {
                  label:'Pc Portable',
                  command: (event) => {
                    this.affichcattype("Univers_Informatique","PC_Portable");
           
                  },
                  routerLink:'/artcileparcategorietype',

              },
              {
                  label:'Pc De Bureau',
                  command: (event) => {
                    this.affichcattype("Univers_Informatique","Pc_De_Bureau");
           
                  },
                  routerLink:'/artcileparcategorietype',

              },
              {
                  label:'Péréphérique et Accessoire Stockage',
                  command: (event) => {
                    this.affichcattype("Univers_Informatique","Péréphérique_et_Accessoire_Stockage");
           
                  },
                  routerLink:'/artcileparcategorietype',
              }
              ,
              {
                  label:'Composant et maintenance',
                  command: (event) => {
                    this.affichcattype("Univers_Informatique","Composant_et_maintenance");
           
                  },
                  routerLink:'/artcileparcategorietype',
              }
          ]
      },
      {
          label:'Univers Telephonie',
          items:[
              {
                  label:'Smartphone',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","Smartphone");
           
                  },
                  routerLink:'/artcileparcategorietype',
              },
              {
                  label:'Apple',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","Apple");
                    
                  },
                  routerLink:'/artcileparcategorietype',
              },
              {
                  label:'GSM',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","GSM");
           
                  },
                  routerLink:'/artcileparcategorietype',
              },
              {
                  label:'Téléphone fixe',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","Téléphone_fixe");
           
                  },
                  routerLink:'/artcileparcategorietype',
              },
              {
                  label:'Accessoir telephoniies',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","Accessoir_telephoniies");
           
                  },
                  routerLink:'/artcileparcategorietype',
              },
              {
                  label:'Smartwatch',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","Smartwatch");
           
                  },
                  routerLink:'/artcileparcategorietype',
              },
              {
                  label:'Tablette',
                  command: (event) => {
                    this.affichcattype("Univers_Telephonie","Tablette");
           
                  },
                  routerLink:'/artcileparcategorietype',
              }
          ]
      },
  ];
  ///////////////////////////////////////////////////////
  this.item = [

    {
        label:this.nom,
        icon:'assets/images.png',
        items:[
            {
                label:'profil',
                icon:'pi pi-user'

            },
            {
                label:'logout',
                icon:'pi pi-sign-out'
            },

        ]
    },
];
}
affichcattype(categorie:String,type:String){
    this.articleserveice.affichArticleparcategorieType(categorie,type).subscribe(
        data=>{
            this.articles=data;
        }
    )
}
cartItem:number;
cartItemFunc(){
    if(localStorage.getItem('localCart')!=null){
        var cartCount=JSON.parse(localStorage.getItem('localCart')|| '{}');
        this.cartItem=cartCount.length;
        console.log('localstorage',cartCount.length);
        console.log('localstorage',this.cartItem)
        
}else{
    this.cartItem=0;
}
}


}
