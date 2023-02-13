import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { SignAlg } from './model/SignAlg';
import { TokenRequest } from './model/tokenRequest';
import { AppClaim } from './model/appClaim';
import { TokenService } from './token.service';
import { EncryptService } from './encrypt.service';
import { RequestedClaim } from './model/requestedClaim';

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
  public valresult: string;
  public reason: string|null;
  public claim: string;
  public myClaims: AppClaim[];
  public key: string;
  public inptext: string;
  public outtext: string;
  public currentIndex: number;
  public req: TokenRequest;
  public clname: string;
  public keyalg: string;
  public keyusage: string;
  public keyform: string;
  public keyforms: any[];
  public encodings: string[];
  public encryptings: string[];
  public hashings: string[]; 
  public signers: SignAlg[] = []; 
  public srcEncoding: string;
  public destEncoding: string;
  public algorithm: string;
  public privkeys: string[];
  public pubkeys: string[];

  constructor(protected tokenService: TokenService,  protected encryptService: EncryptService) {
    this.username = '';
    this.pubkey = '';
    this.privkey = '';
    this.tokenstring = '';
    this.reason = '';
    this.valresult = "unknown";
    this.claim = '';
    this.myClaims = [];
    this.key = '';
    this.keyalg = 'HS256';
    this.keyusage = 'name';
    this.keyform = 'base64';
    this.keyforms = [{name:'chars', description: 'plain chars'}, {name:'hex',description:'hex big integer'}, {name:'base64', description:'base64 or pkcs8 pem'}];
    this.inptext = '';
    this.outtext = '';
    this.currentIndex = 0;
    this.req = {};
    this.clname = '';
    this.srcEncoding = 'Utf8';
    this.destEncoding = 'Utf8';
    this.algorithm = 'Plain';
    this.encodings = encryptService.listEnc();
    this.encryptings = encryptService.listCrypt();
    this.hashings = encryptService.listHash();
    this.privkeys = [];
    this.pubkeys = [];
    this.tokenService.listAlgs().subscribe( (ret: SignAlg[]) => { this.signers = ret; } );
    //[ 'HmacSHA256', 'HmacSHA384', 'HmacSHA512', 'SHA256withRSA', 'SHA384withRSA', 'SHA512withRSA', 'SHA256withECDSA', 'SHA384withECDSA', 'SHA512withECDSA'];
  }

  ngOnInit() {
    this.username = '';
    this.myClaims = [];

    this.tokenService.listPrivkeys().subscribe(
      (ret: string[]) => { this.privkeys = ret; this.pubkeys = this.pubkeys.concat(ret); }
    );

    this.tokenService.listPubkeys().subscribe(
      (ret: string[]) => { this.pubkeys = this.pubkeys.concat(ret); }
    );

  }

  addClaim() {
    let claim = { name: this.clname, value: '' };
    this.myClaims.push(claim);
  }

  create_token() {

    let tokenReq: TokenRequest = this.req;

    if (this.keyusage == 'name') {
      tokenReq.alg = 'keystore';
      tokenReq.key = this.privkey;
    } else {
      tokenReq.alg = this.keyalg;
      tokenReq.key = this.decodeKey64(this.privkey);
    } 
  
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
    (ret: string) => { this.tokenstring = ret; }, 
    (err: any) => { console.log('error: ' + err.message); this.tokenstring = err.error;},
    () => {   }
    );

}

check_token() {

  var alg = '';
  var key = '';
  if (this.keyusage == 'name') {
    alg = 'keystore';
    key = this.pubkey;
  } else {
    alg = this.keyalg;
    key = this.decodeKey64(this.pubkey);
  } 

  this.tokenService.checkJwt(this.tokenstring, key, alg, 'response').subscribe(
    (ret: any) => { 
      console.log(ret.body.reason);
      this.valresult = ret.body.result;
      this.reason = ret.body.reason; 
    },
    (err: any) => { console.log('error: ' + JSON.stringify(err)); this.valresult = err.error.result; this.reason = err.error.reason; },
    () => { }
  );
}

private decodeKey64(key: string) {
    if (this.keyform == 'hex') {
      key = btoa(this.hex2a(key));
    } else if (this.keyform == 'base64') {
      key = key;
    } else {
      key = btoa(key);
    }
    return key;
}

private decodeKey(key: string) {
  if (this.keyform == 'hex') {
    key = this.hex2a(key);
  } else if (this.keyform == 'base64') {
    key = atob(key);
  } else {
    key = key;
  }
  return key;
}

decode() {

  this.outtext = this.encryptService.decrypt(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  return;

//    this.tokenService.decode64(val[1]).subscribe( (ret) => { this.outtext = JSON.stringify(ret); }, err => { console.log('error: ' + err.message)});

}
encode() {
  if  (this.hashings.indexOf(this.algorithm) >= 0) {
    this.outtext = this.encryptService.hash(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  } else {
    this.outtext = this.encryptService.encrypt(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
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
