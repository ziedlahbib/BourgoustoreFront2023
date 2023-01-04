import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.scss']
})
export class NavbarBackComponent implements OnInit {

  
  nom="zied"
  items: MenuItem[]=[];
  constructor() { }

  ngOnInit(): void {
    this.items = [

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

}
