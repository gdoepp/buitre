import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  private encoders: any;
  private algos: any;

  constructor() { 
  
    this.encoders = { Utf8: CryptoJS.enc.Utf8, Base64: CryptoJS.enc.Base64, Hex: CryptoJS.enc.Hex, Latin1: CryptoJS.enc.Latin1,
                      OpenSSL: CryptoJS.format.OpenSSL };
    this.algos = { Plain: new noenc(),
                  AES: CryptoJS.AES, DES: CryptoJS.DES, TripleDES: CryptoJS.TripleDES, 
                  RC4: CryptoJS.RC4, RC4Drop: CryptoJS.RC4Drop, Rabbit: CryptoJS.Rabbit,
                  MD5: CryptoJS.MD5, SHA1: CryptoJS.SHA1, SHA224: CryptoJS.SHA224,
                  SHA256: CryptoJS.SHA256, SHA3: CryptoJS.SHA3, SHA384: CryptoJS.SHA384,
                  SHA512: CryptoJS.SHA512, RIPEMD160: CryptoJS.RIPEMD160,
                  HmacMD5: CryptoJS.HmacMD5, HmacSHA1: CryptoJS.HmacSHA1, HmacSHA224: CryptoJS.HmacSHA224,
                  HmacSHA256: CryptoJS.HmacSHA256, HmacSHA3: CryptoJS.HmacSHA3, HmacSHA384: CryptoJS.HmacSHA384,
                  HmacSHA512: CryptoJS.HmacSHA512, HmacRIPEMD160: CryptoJS.HmacRIPEMD160  };
  }


  public encrypt(msg: string, pwd: string, alg: string, enc1: string, enc2: string): any {
     const doEnc1 = this.encoders[enc1];
     const doEnc2 = this.encoders[enc2];
     const doAlgo = this.algos[alg];  

     let wl1 = doEnc1.parse(msg);    
     
     let wl2 : CryptoJS.lib.CipherParams;
     wl2 = doAlgo.encrypt(wl1, pwd);
     
     if (enc2 == 'OpenSSL') {
       return doEnc2.stringify(wl2);
     } else {

       return ( wl2.salt ? wl2.salt.toString(doEnc2) + '.' : '' ) + 
                 ( wl2.iv ? wl2.iv.toString(doEnc2) + '.' : '') + 
                 wl2.ciphertext.toString(doEnc2);
     }
  }

  public hash(msg: string, pwd: string, alg: string, enc1: string, enc2: string): any {

    const doEnc1 = this.encoders[enc1];
    const doEnc2 = this.encoders[enc2];
    const doAlgo = this.algos[alg];  

    let wl1 = doEnc1.parse(msg);    

    let wl2;
    if (alg.startsWith('Hmac')) {
      wl2 = doAlgo(wl1, pwd);
    } else {
      wl2 = doAlgo(wl1);
    }
    let result = doEnc2.stringify(wl2);

    return result;
 }

  public decrypt(msg: string, pwd: string, alg: string, enc1: string, enc2: string): any {

    const doEnc1 = this.encoders[enc1];
    const doEnc2 = this.encoders[enc2];
    const doAlgo = this.algos[alg]; 

    let wl1;
    try {
      if (enc1 == 'OpenSSL') {
        wl1 = doEnc1.parse(msg);
      } else {
        const ep = msg.split('.');
        if (ep.length < 3) return 'Format error (needs two dots)';
        wl1 = CryptoJS.lib.CipherParams.create({ciphertext: doEnc1.parse(ep[2]), salt: doEnc1.parse(ep[0]), iv: doEnc1.parse(ep[1])});
      }
      
      let wl2 = doAlgo.decrypt(wl1, pwd);
      if (wl2.sigBytes < 0) return 'error in decrypted text';
      let result = doEnc2.stringify(wl2);
      return result;
    } catch(e) {
      return e;
    }
 }



  public listCrypt(): string[] {   
    return ['AES', 'DES', 'TripleDES', 'RC4', 'RC4Drop', 'Rabbit'];
  }

  public listHash(): string[] {
    return ['MD5', 'SHA1', 'SHA224', 'SHA256', 'SHA3', 'SHA384', 'SHA512', 'RIPEMD160'];
  }

  public listEnc(): string[] {
    return ['Utf8', 'Latin1', 'Base64', 'Hex', 'OpenSSL'];
  }

}


class noenc {
  public encrypt(msg: any, pwd: string) {
    return CryptoJS.lib.CipherParams.create({ciphertext: msg});
  }
  public decrypt(msg: any, pwd: string) {
    return msg;
  }

}