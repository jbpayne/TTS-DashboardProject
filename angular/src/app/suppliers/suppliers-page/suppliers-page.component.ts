import { Component, OnInit } from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suppliers-page',
  templateUrl: './suppliers-page.component.html',
  styleUrls: ['./suppliers-page.component.css']
})
export class SuppliersPageComponent implements OnInit {
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
