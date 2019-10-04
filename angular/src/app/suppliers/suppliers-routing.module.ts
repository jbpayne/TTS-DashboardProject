import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SuppliersPageComponent } from './suppliers-page/suppliers-page.component';

const routes: Routes = [
  {
    path: 'suppliers',
    component: SuppliersPageComponent,
  }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forChild(routes);
