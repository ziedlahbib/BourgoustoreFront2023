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
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Console_de_jeux'},
                                
              },
              {
                  label:'unité Gaming',
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Unité_Gaming");
           
                  },
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Unité_Gaming'}

              },
              {
                  label:'péréphériqe Gaming',
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Perephérique_pc_gaming");
           
                  },
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Perephérique_pc_gaming'}
  
              },
              {
                  label:'Composant PC Gaming',
                  /*
                  command: (event) => {
                    this.affichcattype("Univers_Gaming","Composant_PC_Gaming");
           
                  },*/
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Composant_PC_Gaming'},

              },
              {
                label:'PC Portable',
                command: (event) => {
                    this.affichcattype("Univers_Gaming","PC_Portable");
           
                },
                routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'PC_Portable'},

            },

          ]
      },
      {
          label:'Univers Informatique', 
          items:[
              {
                  label:'Pc Portable',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'PC_Portable'},

              },
              {
                  label:'Pc De Bureau',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Pc_De_Bureau'},

              },
              {
                  label:'Péréphérique et Accessoire Stockage',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Péréphérique_et_Accessoire_Stockage'},
              }
              ,
              {
                  label:'Composant et maintenance',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Gaming','type':'Composant_et_maintenance'},
              }
          ]
      },
      {
          label:'Univers Telephonie',
          items:[
              {
                  label:'Smartphone',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'Smartphone'},
              },
              {
                  label:'Apple',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'Apple'},
              },
              {
                  label:'GSM',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'GSM'},
              },
              {
                  label:'Téléphone fixe',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'Téléphone_fixe'},
              },
              {
                  label:'Accessoir telephoniies',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'Accessoir_telephoniies'},
              },
              {
                  label:'Smartwatch',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'Smartwatch'},
              },
              {
                  label:'Tablette',
                  routerLink: ['/artcileparcategorietype'], queryParams: {'cat': 'Univers_Telephonie','type':'Tablette'},
              }
          ]
      },
      {
        label:'Espace Admin',
        icon:'pi pi-th-large',
        routerLink:'/afficherarticle',

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
