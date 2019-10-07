import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CategoriesPageComponent } from './categories-page/categories-page.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesPageComponent,
  }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forChild(routes);
