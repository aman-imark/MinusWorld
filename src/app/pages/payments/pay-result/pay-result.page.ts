import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pay-result',
  templateUrl: './pay-result.page.html',
  styleUrls: ['./pay-result.page.scss'],
})
export class PayResultPage implements OnInit {

  paymentResShow: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) 
  { 
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
        const status = params.paymentStatus;
        if(status === 'true'){
          this.paymentResShow = true;
        }else if(status === 'false'){
          this.paymentResShow = false;
        }
      });
  }






  ngOnInit() {


  }

}
