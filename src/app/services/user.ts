export class UserLogin {
  public email: string;
  public password: string;
  public deviceid: string;
  public fcmtoken: string;
}

export class UserPwdForgot {
  public email: string;
}

export class UserRegister {
  public first_name: string;
  public last_name: string;
  public email: string;
  public pass: string;
  public phone: string = '';
  public company_name: string = '';
  public seller_checkbox: string = '';
}



export class UserPwdUpdate {
  public userid: string;
  public old_pass: string;
  public new_pass: string;
  public con_pass: string;
}



export class UserContactUs {
  public name: string;
  public email: string;
  public phn: string;
  public company: string;
  public message: string;
}







export class UserProduct {
  public userid: string = '';
  public console: string = '';
  public prod_typ: string = '';
  public video_game_typ: string = '';
  public prodname: string = '';
  public game_developer: string = '';
  public yearofrelease: string = '';
  public certification_number: string = '';
  public grade: string = '';
  public variant: string = '';
  public allow_offers: string = '2';
  public desc: any = '';
  public vga_grade: string = '';
  public box_grade: string = '';
  public seal_grade: string = '';
  public net_price: string = '';
  public min_offer: string = '0';
  public status: string = '';
  public disclaimers_check: any = [];
  public gametype: string = '';
  public thumbnail_img: any = [];
  public other_imgs: any = [];
}


export class UserDeliveryShipAddress{
  public Address: string = '';
  public Apartment: string = '';
  public City: string = '';
  public StateId: string = '';
  public StateName: string = '';
  public CountryId: string = '';
  public Country: string = '';
  public Zip: string = '';
  public Phone: string = '';
}



export class UserDeliveryBillAddress{
  public Address: string = '';
  public Apartment: string = '';
  public City: string = '';
  public StateId: string = '';
  public StateName: string = '';
  public CountryId: string = '';
  public Country: string = '';
  public Zip: string = '';
}






export class UserCreditCard {
  public number: number;
  public name: string;
  public expMonth: string;
  public expYear: string;
  public cvc: string;
}

export class UserDebitCard {
  public userid: string;
  public old_pass: string;
  public new_pass: string;
  public ccv_value: string;
}

