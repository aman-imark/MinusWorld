import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalRef: ElementRef;
  constructor() { }

  ngOnInit() {
    console.log(paypal);
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color:  'blue',
          shape:  'rect',
          label:  'pay'
        },  
        
        createOrder: function(data, actions) {
          // Set up the transaction
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00'
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function(details) {
            // This function shows a transaction success message to your buyer.
            console.log(details)
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }
      


    }).render(this.paypalRef.nativeElement);
  }

}
