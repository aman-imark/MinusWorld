import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date',
  templateUrl: './date.page.html',
  styleUrls: ['./date.page.scss'],
})
export class DatePage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
