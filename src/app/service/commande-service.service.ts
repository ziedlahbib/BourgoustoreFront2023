import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

  constructor() { }
  cartSubject = new Subject<any>();
}
