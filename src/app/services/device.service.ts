import { Injectable } from '@angular/core';

// import { Device } from '@capacitor/device';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(public device: Device) { }

  async getDevice_Info(){
      // const info = await Device.getInfo();
      // console.log(info);
      // return info;
  }

  getDInfo(){
    console.log(this.device.platform);
    if (this.device.platform === 'browser') {
      console.log('Device UUID is not supported on browser platform');
    } else {
      console.log('Device UUID is: ' + this.device.uuid);
    }

    // Device.getBatteryInfo().then((res) => {
    //   console.log(res)

    // }, (error) =>{
    //   console.log(error)
    // }).catch((err) => {
    //   console.log(err)
    // })
    console.log('Device UUID is: ' + this.device.uuid);

  }
  

}
