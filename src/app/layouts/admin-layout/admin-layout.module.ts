import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { CustomersComponent } from 'app/forms/customers/customers.component';
import { NewCustomerComponent } from 'app/forms/customers/new-customer/new-customer.component';


import { TovarComponent } from 'app/forms/tovar/tovar.component';
import { DxPivotGridModule, DxCheckBoxModule, DxChartModule } from 'devextreme-angular';




import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatCheckboxModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatTabsModule,
} from '@angular/material';

import { ImportListComponent } from 'app/forms/import-list/import-list.component';


import { FakturaComponent } from 'app/forms/faktura/faktura.component';
import { NewFakturaComponent } from 'app/forms/faktura/new-faktura/new-faktura.component';

import { NewPZComponent } from 'app/forms/pz/new-pz/new-pz.component';
import { PZComponent } from 'app/forms/pz/pz.component';


import { TextMaskModule } from 'angular2-text-mask';
import { SearchTovarPipe } from 'app/searchpipes/search-tovar.pipe';
import { FilterTovarPipe } from 'app/searchpipes/filter-tovar.pipe';


import { SearchCustomerPipe } from 'app/searchpipes/search-customer.pipe';
import { KindUnitComponent } from 'app/forms/kind-unit/kind-unit.component';

import { SettingComponent } from 'app/forms/setting/setting.component';
import { PrintFakturaComponent } from 'app/print_forms/print-faktura/print-faktura.component';
import { OrganizationSettingComponent } from 'app/forms/setting/organization-setting/organization-setting.component';


import { TestWZComponent } from 'app/forms/report/test-wz/test-wz.component';
import { UploadLogoComponent } from 'app/forms/upload-logo/upload-logo.component';
import { OrgonisationLogoComponent } from 'app/forms/setting/organization-setting/orgonisation-logo/orgonisation-logo.component';
import { SearchPKWiUPipe } from 'app/searchpipes/search-pkwi-u.pipe';


import { KartonikComponent } from 'app/forms/kartonik/kartonik.component';
import { NewKartonikComponent } from 'app/forms/kartonik/new-kartonik/new-kartonik.component';
import { NewTovarComponent } from 'app/forms/tovar/new-tovar/new-tovar.component';

//import { OrgonisationLogoComponent } from 'app/forms/setting/organization-setting/orgonisation-logo/orgonisation-logo.component';

//import { AuthenticationComponent } from 'app/forms/authentication/authentication.component';









@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule, ReactiveFormsModule, 

    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,

    TextMaskModule,
    DxPivotGridModule,
    DxCheckBoxModule,
    DxChartModule
  ],
  declarations: [
  //  AuthenticationComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CustomersComponent, 
    NewCustomerComponent,
    ImportListComponent,
    FakturaComponent,
    NewFakturaComponent,
    PZComponent,
    NewPZComponent,
    TovarComponent,
    NewTovarComponent,
   
    UploadLogoComponent,
    OrgonisationLogoComponent,
    
    SearchTovarPipe,
    FilterTovarPipe,
    SearchCustomerPipe,
    SearchPKWiUPipe,
    
    TestWZComponent,

    SettingComponent,
    KindUnitComponent,

    PrintFakturaComponent,
    OrganizationSettingComponent,

    KartonikComponent,
    NewKartonikComponent,
   // OrgonisationLogoComponent,
    
    
  ],
  entryComponents: [
  
  ],
  //providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  
})

export class AdminLayoutModule {}
