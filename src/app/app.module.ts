
import { NgModule } from '@angular/core';

// import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// FIREBASE 
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';


const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthenticationComponent } from './forms/authentication/authentication.component';
import { MatButtonModule, MatInputModule, MatIconModule, MatCardModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,

    FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatIconModule, MatCardModule, MatTabsModule,

    ToastrModule.forRoot(),
    // HttpModule,
    HttpClientModule,
    
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // }),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],

  // exports: [
  //   MatButtonModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatRippleModule,
  // ],

  declarations: [
    AuthenticationComponent,
    AdminLayoutComponent,
    AppComponent,
  
  ],
 // providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
