import { Routes } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
export const routes: Routes = [
    {
        path:'',
        redirectTo: '/login',
        pathMatch:'full',
    },
    {
        path:'home',
        loadComponent: ()=>import('./home/home.component').then(m=>m.HomeComponent)
    },{
        path:'product',
        loadComponent: ()=>import('./product/product.component').then(m=>m.ProductComponent)
    },{
        path:'login',
        loadComponent: ()=>import('./login/login.component').then(m=>m.LoginComponent)
    },{
        path:'register',
        loadComponent: ()=>import('./register/register.component').then(m=>m.RegisterComponent)
    },{
        path:'order',
        loadComponent:()=>import('./order/order.component').then(m=>m.OrderComponent)
    },{
        path:'search',
        loadComponent:()=>import('./search/search.component').then(m=>m.SearchComponent)
    },{
        path:'admin',
        loadComponent:()=>import('./admin/admin.component').then(m=>m.AdminComponent)

    },{
        path:'user',
        loadComponent:()=>import('./user/user.component').then(m=>m.UserComponent)
    },{
        path:'my-account',
        component:MyAccountComponent
    },{
        path:'alerts',
        loadComponent:()=>import('./alerts/alerts.component').then(m=>m.AlertsComponent)
    },{
        path:'bills',
        loadComponent:()=>import('./bills/bills.component').then(m=>m.BillsComponent)
    }
];
