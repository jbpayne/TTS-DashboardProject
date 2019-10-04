import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSync, faEdit, faTrashAlt, faWindowClose, faSort } from '@fortawesome/free-solid-svg-icons';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertsComponent
  ],
  exports: [
    HttpClientModule,
    FontAwesomeModule,
    AlertsComponent
  ]
})

export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSync, faEdit, faTrashAlt, faWindowClose, faSort);
  }

}

export { AlertsComponent };
