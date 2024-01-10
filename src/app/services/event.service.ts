import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();

  private cartdataObserved = new BehaviorSubject<any>('');
  cart_currentEvent = this.cartdataObserved.asObservable();

  constructor() { }



  publish(param):void {
    this.dataObserved.next(param);
  }

  publishCart(param2):void {
    this.cartdataObserved.next(param2);
  }


}
