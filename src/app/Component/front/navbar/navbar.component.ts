import { AfterContentInit, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Article } from 'src/app/model/article.model';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { ArticleServiceService } from 'src/app/service/article-service.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

    user: User;
    role: Role;
    username: String;
    isLoggedIn = false;
    articles: Article[];
    nom = "zied"
    items: MenuItem[] = [];
    profileMenu: MenuItem[] = [];
    cartItem: number;

    constructor(
        private cs: CommandeServiceService,
        private authenticationService: AuthServiceService,
        private us: UserServiceService,
        private router:Router
    ) {
        this.cs.cartSubject.subscribe(
            (data) => {
                this.cartItem = data;
            }
        );
    }

    ngOnInit(): void {
        this.us.getuserbyusername(sessionStorage.authenticatedUser).subscribe(
            data => {
                this.user = data;
                this.role = data.role;
                this.username = data.userName;
                console.log(data.role)
            }
        )
        this.isLoggedIn = this.authenticationService.isUserLoggedIn();
        this.initNavbarUrls()

        this.cartItemFunc();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.router.navigate(['recherche'], { queryParams: { filterValue: filterValue }});
        console.log(filterValue);
        

        // var articlessearch: any[] = [];
        // for (let v of this.articles) {
        //     if (v.name.includes(filterValue)) {
        //         articlessearch.push(v);
        //     }
        // }
        // this.articles = articlessearch;
        // console.log(this.articles)
    }

  
    cartItemFunc() {
        if (localStorage.getItem('localCart') != null) {
            var cartCount = JSON.parse(localStorage.getItem('localCart') || '{}');
            this.cartItem = cartCount.length;
            console.log('localstorage', cartCount.length);
            console.log('localstorage', this.cartItem)

        } else {
            this.cartItem = 0;
        }
    }

    handleLogout() {
        this.authenticationService.logout();
    }

    initNavbarUrls(){
        this.items = [
            {
                label: 'home',
                icon: 'pi pi-home',
                routerLink: '/home',
            },
            {
                label: 'Univers Gaming',
                items: [
                    {
                        label: 'Console de jeux',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Console_de_jeux' },
                    },
                    {
                        label: 'unité Gaming',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Unité_Gaming' }
                    },
                    {
                        label: 'péréphériqe Gaming',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Perephérique_pc_gaming' }

                    },
                    {
                        label: 'Composant PC Gaming',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Composant_PC_Gaming' },
                    },
                    {
                        label: 'PC Portable',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'PC_Portable' },
                    },
                ]
            },
            {
                label: 'Univers Informatique',
                items: [
                    {
                        label: 'Pc Portable',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'PC_Portable' },

                    },
                    {
                        label: 'Pc De Bureau',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Pc_De_Bureau' },

                    },
                    {
                        label: 'Péréphérique et Accessoire Stockage',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Péréphérique_et_Accessoire_Stockage' },
                    }
                    ,
                    {
                        label: 'Composant et maintenance',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Composant_et_maintenance' },
                    }
                ]
            },
            {
                label: 'Univers Telephonie',
                items: [
                    {
                        label: 'Smartphone',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Smartphone' },
                    },
                    {
                        label: 'Apple',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Apple' },
                    },
                    {
                        label: 'GSM',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'GSM' },
                    },
                    {
                        label: 'Téléphone fixe',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Téléphone_fixe' },
                    },
                    {
                        label: 'Accessoir telephoniies',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Accessoir_telephoniies' },
                    },
                    {
                        label: 'Smartwatch',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Smartwatch' },
                    },
                    {
                        label: 'Tablette',
                        routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Tablette' },
                    }
                ]
            },
            {
                label: 'Espace Admin',
                icon: 'pi pi-th-large',
                routerLink: '/afficherarticle',

            },
        ];
        this.profileMenu = [
            {
                label: this.nom,
                icon: 'assets/images.png',
                items: [
                    {
                        label: 'profil',
                        icon: 'pi pi-user'
                    },
                    {
                        label: 'logout',
                        icon: 'pi pi-sign-out',
                        routerLink: '/login',
                    },
                ]
            },
        ];
    }

}
