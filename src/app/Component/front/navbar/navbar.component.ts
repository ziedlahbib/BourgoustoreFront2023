import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
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

export class NavbarComponent implements OnInit,AfterViewInit {

    user: User;
    role: string;
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
    ngAfterViewInit(): void {
        this.us.getuserbyusername(sessionStorage.authenticatedUser).subscribe(
            data => {
                this.user = data;
                this.role = data.role.role;
                this.username = data.userName;
                console.log(data.role.role)
            }
        )
    }

    ngOnInit(): void {

        this.isLoggedIn = this.authenticationService.isUserLoggedIn();
        this.initNavbarUrls()
        this.cartItemFunc();
        this.us.getuserbyusername(sessionStorage.authenticatedUser).subscribe(
            data => {
                this.user = data;
                this.role = data.role.role;
                this.username = data.userName;
            }
        )
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.router.navigate(['recherche'], { queryParams: { filterValue: filterValue }});
        
        
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
    isAdmin() :boolean{
    let isa: boolean=true;
        if(this.role=='CLIENT')
            { 
            isa=false
        }else if(this.role=='ADMIN'){
            isa=true
        }
    return isa
    }
}
