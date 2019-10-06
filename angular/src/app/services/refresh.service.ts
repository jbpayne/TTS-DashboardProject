import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  refresh = new EventEmitter();
  constructor() { }
}
