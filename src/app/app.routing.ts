import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './forms/authentication/authentication.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthenticationGuardService } from './services/authentication/authentication-guard.service';



const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, 
  {
    path: '',
    component: AdminLayoutComponent, canActivate: [AuthenticationGuardService],
    children: [
        { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}]
  },
  {
    path: 'login',
    component: AuthenticationComponent
   }, 
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})

export class AppRoutingModule { }