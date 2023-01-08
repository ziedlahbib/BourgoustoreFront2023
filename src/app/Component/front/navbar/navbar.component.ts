import { AfterContentInit, Component, NgModule, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommandeServiceService } from 'src/app/service/commande-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  nom="zied"
  items: MenuItem[] = [];
  item: MenuItem[] = [];
  constructor(private cs:CommandeServiceService) {
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
          label:'Gaming',
          items:[
              {
                  label:'Console de jeux',
              },
              {
                  label:'unité Gaming',

              },
              {
                  label:'péréphériqe Gaming',
  
              },
              {
                  label:'Composant PC Gaming',

              },
              {
                label:'PC Portable',

            },

          ]
      },
      {
          label:'Users',
          icon:'pi pi-fw pi-user',
          items:[
              {
                  label:'New',
                  icon:'pi pi-fw pi-user-plus',

              },
              {
                  label:'Delete',
                  icon:'pi pi-fw pi-user-minus',

              },
              {
                  label:'Search',
                  icon:'pi pi-fw pi-users',
                  items:[
                  {
                      label:'Filter',
                      icon:'pi pi-fw pi-filter',
                      items:[
                          {
                              label:'Print',
                              icon:'pi pi-fw pi-print'
                          }
                      ]
                  },
                  {
                      icon:'pi pi-fw pi-bars',
                      label:'List'
                  }
                  ]
              }
          ]
      },
      {
          label:'Events',
          icon:'pi pi-fw pi-calendar',
          items:[
              {
                  label:'Edit',
                  icon:'pi pi-fw pi-pencil',
                  items:[
                  {
                      label:'Save',
                      icon:'pi pi-fw pi-calendar-plus'
                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-calendar-minus'
                  },

                  ]
              },
              {
                  label:'Archieve',
                  icon:'pi pi-fw pi-calendar-times',
                  items:[
                  {
                      label:'Remove',
                      icon:'pi pi-fw pi-calendar-minus'
                  }
                  ]
              }
          ]
      },
      {
          label:'Quit',
          icon:'pi pi-fw pi-power-off'
      }
  ];
  ///////////////////////////////////////////////////////
  this.item = [

    {
        label:this.nom,
        icon:'assets/images.png',
        items:[
            {
                label:'Left',
                icon:'pi pi-fw pi-align-left'
            },
            {
                label:'Right',
                icon:'pi pi-fw pi-align-right'
            },
            {
                label:'Center',
                icon:'pi pi-fw pi-align-center'
            },
            {
                label:'Justify',
                icon:'pi pi-fw pi-align-justify'
            },

        ]
    },
];
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
