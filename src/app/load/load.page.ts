import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    setTimeout(( ) => { 
       this.navCtrl.navigateRoot(['/maintabs/tabs'])
    }, 2000)
  }

}
