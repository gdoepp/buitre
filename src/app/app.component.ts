import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { TokenResponse } from './model/tokenResponse';
import { TokenRequest } from './model/tokenRequest';
import { AppClaim } from './model/appClaim';
import { TokenService } from './token.service';
import { EncryptService } from './encrypt.service';
import { RequestedClaim } from './model/requestedClaim';
import { enc } from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Crypto-App';

  public username: string;
  public privkey: string;
  public pubkey: string;
  public tokenstring: string;
  public tokencontent: string|null;
  public claim: string;
  public myClaims: AppClaim[];
  public key: string;
  public inptext: string;
  public outtext: string;
  public currentIndex: number;
  public req: TokenRequest;
  public clname: string;
  public keyusage: string;
  public encodings: string[];
  public encryptings: string[];
  public hashings: string[]; 
  public srcEncoding: string;
  public destEncoding: string;
  public algorithm: string;
  public privkeys: string[];
  public pubkeys: string[];

  constructor(protected tokenService: TokenService,  protected encryptService: EncryptService, private formBuilder: UntypedFormBuilder) {
    this.username = '';
    this.pubkey = '';
    this.privkey = '';
    this.tokenstring = '';
    this.tokencontent = '';
    this.claim = '';
    this.myClaims = [];
    this.key = '';
    this.inptext = '';
    this.outtext = '';
    this.currentIndex = 0;
    this.req = {};
    this.clname = '';
    this.keyusage = 'bytes';
    this.srcEncoding = 'Utf8';
    this.destEncoding = 'Utf8';
    this.algorithm = 'Plain';
    this.encodings = encryptService.listEnc();
    this.encryptings = encryptService.listCrypt();
    this.hashings = encryptService.listHash();
    this.privkeys = [];
    this.pubkeys = [];
  }

  ngOnInit() {
    this.username = '';
    this.myClaims = [];

    this.tokenService.listPrivkeys().subscribe(
      (ret) => { this.privkeys = ret; this.pubkeys = this.pubkeys.concat(ret); }
    );

    this.tokenService.listPubkeys().subscribe(
      (ret) => { this.pubkeys = this.pubkeys.concat(ret); }
    );

  }


  addClaim() {
    let claim = { name: this.clname, value: '' };
    this.myClaims.push(claim);
  }

  create_token() {

  let tokenReq: TokenRequest = this.req;
  tokenReq.key = this.privkey;
  tokenReq.fromKeystore = this.keyusage == 'name';

  let claims : RequestedClaim[] = [];
  for (let cl of this.myClaims) {

    if (cl.name && cl.value && cl.value.length > 0) {
      let clm : RequestedClaim = {};
      clm.name = cl.name;
      clm.value = cl.value;
      claims.push(clm);
    }
    tokenReq.claims = claims;
    
  }
  this.tokenstring = '';
  this.tokenService.create(tokenReq).subscribe( 
    (ret) => { this.tokenstring = ret; }, 
    err => { console.log('error: ' + err.message); this.tokenstring = err.error;},
    () => {   }
    );

}

check_token() {
  if (this.keyusage != 'name') {
    if (this.keyusage == 'bytesX') {
      this.pubkey = this.hex2a(this.pubkey);
    } else if (this.keyusage == 'bytes64') {
      this.pubkey = atob(this.pubkey);
    }
  }
  this.tokenService.checkJwt(this.tokenstring, this.pubkey, this.keyusage == 'name', 'response').subscribe(
    (ret) => { this.tokencontent = ret.status == 200 ? ret.body : ret.statusText; },
    err => { console.log('error: ' + err.message); this.tokencontent = err.error; },
    () => { }
  );
}

decode() {

this.outtext = this.encryptService.decrypt(this.inptext, this.key, this.algorithm, this.srcEncoding, this.destEncoding);
return;

//    this.tokenService.decode64(val[1]).subscribe( (ret) => { this.outtext = JSON.stringify(ret); }, err => { console.log('error: ' + err.message)});

}
encode() {
  if  (this.hashings.indexOf(this.algorithm) >= 0) {
    this.outtext = this.encryptService.hash(this.inptext, this.key, this.algorithm, this.srcEncoding, this.destEncoding);
  } else {
    this.outtext = this.encryptService.encrypt(this.inptext, this.key, this.algorithm, this.srcEncoding, this.destEncoding);
  } 

//  this.tokenService.encode64(this.inptext).subscribe( (ret) => { this.outtext = ret;  }, err => { console.log('error: ' + err.message)});

}

hex2a(hexx: String) { 
  var str = '';     
  for (var i = 0; i < hexx.length; i += 2)  {  
    str += String.fromCharCode(parseInt(hexx.substr(i, 2), 16)); 
  }
  return str; 
}

}
