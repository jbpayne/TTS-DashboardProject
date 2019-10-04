import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { ModuleRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent    
  ],
  imports: [
    SharedModule,
    BrowserModule,
    ModuleRouting,
    ProductsModule,
    CategoriesModule,
    SuppliersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
