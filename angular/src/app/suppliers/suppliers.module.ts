import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SuppliersPageComponent } from './suppliers-page/suppliers-page.component';
import { ModuleRouting } from './suppliers-routing.module';
import { ApiService } from '../services/api.service';
// import { TableComponent } from '../suppliers/table/table.component';
// import { AlertsComponent } from '../suppliers/alerts/alerts.component';
// import { PageNavbarComponent } from '../suppliers/page-navbar/page-navbar.component';
// import { ModalFormComponent } from '../suppliers/modal-form/modal-form.component';



@NgModule({
  declarations: [
    SuppliersPageComponent,
    // AlertsComponent,
    // PageNavbarComponent,
    // TableComponent,
    // ModalFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModuleRouting
  ],
  providers: [
    ApiService
  ]
})
export class SuppliersModule { }
