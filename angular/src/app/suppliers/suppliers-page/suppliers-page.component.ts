import { Component, OnInit } from '@angular/core';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suppliers-page',
  templateUrl: './suppliers-page.component.html',
  styleUrls: ['./suppliers-page.component.css']
})
export class SuppliersPageComponent implements OnInit {

  faSync = faSync;

  constructor() { }

  ngOnInit() {
  }

  reload(): void {
    location.reload();
  }

}

