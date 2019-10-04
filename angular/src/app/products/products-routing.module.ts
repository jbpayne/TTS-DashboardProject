import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsPageComponent,
  }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forChild(routes);
