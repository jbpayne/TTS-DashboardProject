import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { TableComponent } from './table/table.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { PageNavbarComponent } from './page-navbar/page-navbar.component';
import { ModuleRouting } from './products-routing.module';
import { ApiService } from '../services/api.service';



@NgModule({
  declarations: [
    ProductsPageComponent,
    PageNavbarComponent,
    TableComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModuleRouting
  ],
  exports: [
    TableComponent,
    ModalFormComponent,
    PageNavbarComponent
  ],
  providers: [
    ApiService
  ]
})
export class ProductsModule { }
