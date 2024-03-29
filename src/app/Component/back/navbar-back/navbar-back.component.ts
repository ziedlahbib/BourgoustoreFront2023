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
  item: MenuItem[]=[];
  constructor() { }

  ngOnInit(): void {
    this.item = [
        {
            label:'home',
            icon:'pi pi-home',
            routerLink:'/home',
  
        },];
    this.items = [

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

}
