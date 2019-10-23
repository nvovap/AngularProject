import { NgModule } from '@angular/core';

//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';



// import {MatButtonModule, MatInputModule, MatIconModule, MatCardModule} from '@angular/material';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // FormsModule, ReactiveFormsModule,
    // MatButtonModule, MatInputModule, NoopAnimationsModule, MatIconModule, MatCardModule, 
  ],
  declarations: [ 
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule { }
