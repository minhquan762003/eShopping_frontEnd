import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo: '/home',
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
    }
];
