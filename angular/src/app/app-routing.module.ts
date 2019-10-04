import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'


const routes: Routes = [
  {
    path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'suppliers', loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersModule)
  }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
