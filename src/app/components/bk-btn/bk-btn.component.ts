import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-bk-btn',
  templateUrl: './bk-btn.component.html',
  styleUrls: ['./bk-btn.component.scss'],
})
export class BkBtnComponent implements OnInit {

  constructor(public routerOutlet: IonRouterOutlet) { }


  goBack() {
    this.routerOutlet.pop();
}

  ngOnInit() {}

}
