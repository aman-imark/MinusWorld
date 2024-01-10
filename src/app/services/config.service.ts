import { Injectable } from '@angular/core';

import { isPlatform, Platform } from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, HttpResponse, HttpOptions } from '@capacitor-community/http';

import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // https://capacitorjs.com/blog/bypassing-cors-with-the-http-plugin
  // https://medium.com/enappd/how-to-make-api-calls-in-ionic-capacitor-apps-a9c22d205a1d

  // public yourSiteUrl =  'https://minusworlds.com';
  // public yourSiteUrl =  'http://evolvethought.com/minusworlds';


  // for CROS issue
  // https://medium.com/weekly-webtips/do-you-know-how-to-resolve-cors-issues-in-angular-9d818474825f



  loading;
  // public yourSiteUrl =  'https://evolvethought.com/minusworlds';
  public yourSiteUrl = 'https://dev1.minusworlds.com';

  public Baseurl: string = this.yourSiteUrl + '/api';
  // public Baseurl: string = this.yourSiteUrl + '/api';

 

  constructor(private platform: Platform, public loadingCtrl: LoadingController, 
              private http: HttpClient) { }


  postData(Url,payload) {

    let nativeHeaders;
      // 'Content-Type': 'application/json; charset=UTF-8',
      // 'Access-Control-Allow-Origin': '*',
      // 'enctype': 'application/x-www-form-urlencoded',

    //  nativeHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json', 
    //   'Access-Control-Allow-Origin': '*', 
    //  });

    nativeHeaders = {
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*', 
    };


     let optns: HttpOptions = { 
       url: this.Baseurl+Url,
       method : 'POST',
       data : payload,
       headers : {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'enctype': 'application/x-www-form-urlencoded'},
      };



      return new Promise(resolve => {
          if(this.platform.is('ios') || this.platform.is('android')) {
            Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, headers: nativeHeaders }).then(data => {
            // Http.request(optns).then(data => {
                // console.log(data.data);
                resolve(data.data);              
            }, (er) => {
                console.log(er);
                resolve(er);
            }).catch(err => {
                console.log(err);
                resolve(err);
            });
          }else{
            Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, headers: nativeHeaders }).then(data => {
            // Http.request(optns).then((data: any) => {
                resolve(data.data);
            }, (er) => {
                 console.log(er);
                 resolve(er);
            }).catch(err => {
                console.log(err);
                resolve(err);
            });
          }
      });

      // return new Promise(resolve => {
      //   this.http.post(this.Baseurl+Url, payload,    ).subscribe((data: any) => {
      //     resolve(data);
      //     console.log(data);
      //     console.log('Else working in config');
      //   }, (err) => {
      //     console.log(err);
      //   });
      // });
  }



  postFormData(Url,payload) {
    // CROS isssue comes when we using 'Content-Type': 'application/json' or 'enctype': 'multipart/form-data' 
    let nativeHeaders;
    nativeHeaders = { 'Content-Type': 'multipart/form-data', 'Authorization': 'No Auth' };

      return new Promise(resolve => {
            // Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, headers: nativeHeaders }).then(data => {
            //     // console.log(data.data);
            //     resolve(data.data);              
            // },(reason) => {
            //   console.log(reason);
            // }).catch(err => {
            //     console.log(err);
            //     resolve(err);
            // });
          if(this.platform.is('ios') || this.platform.is('android')) {
            Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, headers: nativeHeaders }).then(data => {
                resolve(data.data);              
            }).catch(err => {
                console.log(err);
                resolve(err);
            });
          }else{
            Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, headers: nativeHeaders }).then((data: any) => {
                resolve(data.data);
            }, (er) => {
                 console.log(er);
                 resolve(er);
            }).catch(err => {
                console.log(err);
                resolve(err);
            });
          }
      });
  }







  getData(Url,token = '') {
    let nativeHeaders;
    nativeHeaders = { 'Content-Type': 'application/json', 'Authorization': 'No Auth' };
    return new Promise(resolve => { 
      Http.request({url: this.Baseurl+Url,  method: 'GET', headers: nativeHeaders }).then(data => {
          // console.log(data);
          // const d = JSON.parse(data.data);
            resolve(data.data);

      }).catch(error => {
          console.log(error);
          // const er = JSON.parse(error.error);
            resolve(error);
      });
    })
  }







  async show() {
    this.loading = await this.loadingCtrl.create({
      duration: 7000
    });
    this.loading.present();
  }


  hide() {
    try {
      this.loading.dismiss();
    } catch (error) { }
  }


  async autoHide(time) {
    this.loading = await this.loadingCtrl.create({
      duration: time
    });
    this.loading.present();
  }



}
















// Not used curentlly, based on test








// public yourSiteUrl =  'https://minusworlds.com';
// public Baseurl: string = this.yourSiteUrl + '/api';

// plt: string;
// localhost:string = 'localhost';

// web_get_unrestricted = 0;
// web_post_unrestricted = 0;
// web_put_unrestricted = 0;
// web_delete_unrestricted = 0;

// android_get_unrestricted = 0;
// android_post_unrestricted = 0;
// android_put_unrestricted = 0;
// android_delete_unrestricted = 0;

// ios_get_unrestricted = 0;
// ios_post_unrestricted = 0;
// ios_put_unrestricted = 0;
// ios_delete_unrestricted = 0;



// // More variables for restricted API calls
// constructor(private platform: Platform) {
//   this.plt = this.platform.is('mobileweb') ? 'web' :
//     this.platform.is('ios') ? 'ios' : 'android'
//     this.localhost ="192.168.0.7"
// }

// // private http:HTTP,  public alrtCtrl: AlertController,
// // private httpClient: HttpClient,
// // public toastController: ToastController,
// // public platform: Platform ) { }


// getData(Url,token = ''){
//   let nativeHeaders;
//   if(token === '') {
//    nativeHeaders = {
//       'Content-Type': 'application/json'
//     };
//   } else {
//     nativeHeaders = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     };
//   }
  

//   // Http.request({ url: 'https://minusworlds.com/api/privacy', method: 'GET'})
//   //   .then(async response => {
//   //     console.log(response);
//   //     if (response.status === 200) {
//   //       const data = await response.data;
//   //       console.log(data)
       
//   //     }
//   //   })
//   //   .catch(e => {
//   //     console.log(e)
//   //   })

//     // {method: 'GET', headers: {"Content-Type": "application/json"}

//   return new Promise(resolve => { 
//     // Http.setDataSerializer('json');
//     Http.request({url: this.Baseurl+Url,  method: 'GET', headers: nativeHeaders }).then(data => {
 
//           // console.log(data);
//           // const d = JSON.parse(data.data);
//                     resolve(data);

//         }).catch(error => {
//           // console.log(error);
//           // const er = JSON.parse(error.error);
//               resolve(error);
//         });
//     })
// }




// get() {
//   let nativeHeaders;
//   let token;

//   if(token === '') {
//    nativeHeaders = {
//       'Content-Type': 'application/json'
//     };
//   } else {
//     nativeHeaders = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     };
//   }

//   let options = {
//     url: 'https://clientpreview.site/interpreter-app/api/covid',
    
//     headers: { 'Content-Type': 'application/json'},
//     params: {},
    
//   };
//   let options2 = {    
//     headers: { 'Content-Type': 'application/json'},
//     params: {},
//   }


//   // Http.request({ ...options, method: 'GET' })
//   // .then(async res => {
//   //   console.log(res);
//   // })
//   // .catch(e => {
//   //   console.log(e)
//   //   // this.changeStatus('post', 'unrestricted', 2);
//   // })





//   // const request = new Request('https://minusworlds.com/api/privacy',{method: 'GET', headers: {"Content-Type": "application/json"}});
//   // fetch(request)
//   // .then(res => {
//   //   console.log(res);

//   // })
//   // .then(resp => {
//   //   console.log(resp);
//   //   // console.debug(response);
//   //   // ...
//   // }).catch(er => {
//   //   console.log(er);
//   //   // console.error(error);
//   // });






//   // fetch('https://clientpreview.site/interpreter-app/api/covid')
//   // .then(async res => {
//   //   console.log(res)
//   // })
//   // .catch(e => {
//   //  console.log(e)
//   // })

//   Http.request({ url: 'https://minusworlds.com/api/privacy', method: 'GET'})
//     .then(async response => {
//       console.log(response);
//       if (response.status === 200) {
//         const data = await response.data;
//         console.log(data)
       
//       }
//     })
//     .catch(e => {
//       console.log(e)
    
//     })


//   // Http.request({ url: 'https://clientpreview.site/interpreter-app/api/covid', method: 'GET'})
//   //   .then(async response => {
//   //     console.log(response);
//   //     if (response.status === 200) {
//   //       const data = await response.data;
//   //       console.log(data)
//   //       this.changeStatus('get', 'unrestricted', 1);
//   //     }
//   //   })
//   //   .catch(e => {
//   //     console.log(e)
//   //     this.changeStatus('get', 'unrestricted', 2);
//   //   })
// }

// post() {
//   const data = { data: 'postData' }
//   const options = {
//     url: `http://${this.localhost}:5000/ionic4fullapp/us-central1/postData`,
//     data: data,
//     headers: { 'Content-Type': 'application/json' }
//   };
//   Http.request({ ...options, method: 'POST' })
//     .then(async response => {
//       if (response.status === 200) {
//         const data = await response.data;
//         console.log(data)
//         this.changeStatus('post', 'unrestricted', 1);
//       }
//     })
//     .catch(e => {
//       console.log(e)
//       this.changeStatus('post', 'unrestricted', 2);
//     })
// }


// put() {
//   const data = { data: 'putData' }
//   const options = {
//     url: `http://${this.localhost}:5000/ionic4fullapp/us-central1/putData`,
//     data: data,
//     headers: { 'Content-Type': 'application/json' }
//   };
//   Http.request({ ...options, method: 'PUT' })
//     .then(async response => {
//       if (response.status === 200) {
//         const data = await response.data;
//         console.log(data)
//         this.changeStatus('put', 'unrestricted', 1);
//       }
//     })
//     .catch(e => {
//       console.log(e)
//       this.changeStatus('put', 'unrestricted', 2);
//     })
// }

// delete() {
//   const data = { data: 'deleteData' }
//   const options = {
//     url: `http://${this.localhost}:5000/ionic4fullapp/us-central1/deleteData`,
//     data: data,
//     headers: { 'Content-Type': 'application/json' }
//   };
//   Http.request({ ...options, method: 'DELETE' })
//     .then(async response => {
//       if (response.status === 200) {
//         const data = await response.data;
//         console.log(data)
//         this.changeStatus('delete', 'unrestricted', 1);
//       }
//     })
//     .catch(e => {
//       console.log(e)
//       this.changeStatus('delete', 'unrestricted', 2);
//     })
// }

// changeStatus(type, restriction, status) {
//   this[`${this.plt}_${type}_${restriction}`] = status
// }



// // getData(Url,token = '') {

  
// //   let nativeHeaders;

// //   if(token === '') {
// //    nativeHeaders = {
// //       'Content-Type': 'application/json'
// //     };
// //   } else {
// //     nativeHeaders = {
// //       'Content-Type': 'application/json',
// //       'Authorization': `Bearer ${token}`
// //     };
// //   }

// //   return this.http.get('https://swapi.co/api/films');

// //   return new Promise(resolve => {
// //     this.http.setDataSerializer('json');
// //     this.http.get(this.Baseurl+Url, {},nativeHeaders).then(data => {
// //           // console.log(data);
// //           const d = JSON.parse(data.data);
// //           resolve(d);
// //           // console.log('Success : ' +JSON.stringify(data));
// //         }).catch(error => {
// //           console.log(error);
// //           const er = JSON.parse(error.error);
// //           resolve(er);
// //           // console.log(error.error);
// //           // console.log('Error : ' + Url);
// //           // console.log(error);
// //           // console.log(error.error); // error message as string
// //           // console.log(error.headers);
// //         });
// //   })
// // }