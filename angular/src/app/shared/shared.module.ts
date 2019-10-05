import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSync, faEdit, faTrashAlt, faWindowClose, faSort } from '@fortawesome/free-solid-svg-icons';
import { AlertsComponent } from './alerts/alerts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

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
    AlertsComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSync, faEdit, faTrashAlt, faWindowClose, faSort);
  }

}

export { AlertsComponent };
