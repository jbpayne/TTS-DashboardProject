import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { TableComponent } from './table/table.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ModuleRouting } from './categories-routing.module';
import { ApiService } from '../services/api.service';



@NgModule({
  declarations: [
    CategoriesPageComponent,
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
    ModalFormComponent
  ],
  providers: [
    ApiService
  ]
})
export class CategoriesModule { }
