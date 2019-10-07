import { Component, OnInit } from '@angular/core';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  alertType: string;
  message: string;

  faSync = faSync;

  constructor(private refreshService: RefreshService) { }

  ngOnInit() {
    this.alertType = 'info';
    this.message = 'Sort order: <strong>1.</strong> ID, ascending';
  }

  sendAlert(alert) {
    this.alertType = alert.type;
    this.message = alert.message;
  }

  refresh(): void {
    this.refreshService.refresh.emit();
  }

}
