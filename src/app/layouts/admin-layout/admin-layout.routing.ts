import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from  '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CustomersComponent } from 'app/forms/customers/customers.component';
import { FakturaComponent } from 'app/forms/faktura/faktura.component';
import { ImportListComponent } from 'app/forms/import-list/import-list.component';
import { PZComponent } from 'app/forms/pz/pz.component';
import { TovarComponent } from 'app/forms/tovar/tovar.component';
import { SettingComponent } from 'app/forms/setting/setting.component';
import { KartonikComponent } from 'app/forms/kartonik/kartonik.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'customers',      component: CustomersComponent },
    { path: 'tovars',         component: TovarComponent },
    { path: 'kartonik',       component: KartonikComponent },
    { path: 'factura',        component: FakturaComponent },
    { path: 'import-list',    component: ImportListComponent },
    { path: 'PZ',             component: PZComponent },
    { path: 'setting',        component: SettingComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent},
    { path: 'upgrade',        component: UpgradeComponent },
];

