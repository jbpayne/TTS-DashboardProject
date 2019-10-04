import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  alertSuccess = document.getElementsByClassName("alert-success")[0];
  alertInfo = document.getElementsByClassName("alert-info")[0];
  alertWarning = document.getElementsByClassName("alert-warning")[0];
  alertDanger = document.getElementsByClassName("alert-danger")[0];

  constructor() { }

  ngOnInit() {
  }

  success(message: string) {
    this.alertInfo.classList.add("d-none");
    this.alertWarning.classList.add("d-none");
    this.alertDanger.classList.add("d-none");
    this.alertSuccess.classList.remove("d-none");
    this.alertSuccess.innerHTML = message;
  }

  info(message: string) {
    this.alertSuccess.classList.add("d-none");
    this.alertWarning.classList.add("d-none");
    this.alertDanger.classList.add("d-none");
    this.alertInfo.classList.remove("d-none");
    this.alertInfo.innerHTML = message;
  }

  warning(message: string) {
    this.alertInfo.classList.add("d-none");
    this.alertWarning.classList.add("d-none");
    this.alertDanger.classList.add("d-none");
    this.alertSuccess.classList.remove("d-none");
    this.alertSuccess.innerHTML = message;
  }

  danger(message: string) {
    this.alertInfo.classList.add("d-none");
    this.alertWarning.classList.add("d-none");
    this.alertDanger.classList.add("d-none");
    this.alertSuccess.classList.remove("d-none");
    this.alertSuccess.innerHTML = message;
  }

}
