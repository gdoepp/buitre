import { Component, OnInit } from '@angular/core';
import { PgpService } from '../../kryptutil-api-out/api/pgp.service';
import { KryptBase } from '../KryptBase';

@Component({
    selector: 'code-asym',
    templateUrl: './code-asym.component.html',
    styleUrls: ['./code-asym.component.css'],
    standalone: false
})
export class CodeASymComponent extends KryptBase implements OnInit {

  public reason: string|null;
  public privKey: string;
  public pubKey: string;
  public origtext: string;
  public enctext: string;
  public dectext: string | undefined;
  public currentIndex: number;
  public keyalg: number;
  public keyusageE: string;
  public keyusageD: string;
  public keyformE: string;
  public keyformD: string;
  public keyforms: any[];
  public srcEncoding: string;
  public destEncoding: string;
  public algorithm: string;
  public fileName: string;
  public pubKeys: string[];
  public privKeys: string[];  
  public verified: string | undefined;

  constructor(protected pgpService: PgpService) {
    super();
    this.reason = '';
    this.pubKey = 'default';
    this.privKey = 'default';
    this.keyalg = 0;
    this.keyusageE = 'name';
    this.keyusageD = 'name';
    this.keyformE = 'base64';
    this.keyformD = 'base64';
    this.keyforms = [{name:'chars', description: 'plain chars'}, {name:'hex',description:'hex big integer'}, {name:'base64', description:'base64 or pkcs8 pem'}];
    this.origtext = '';
    this.enctext = '';
    this.dectext = undefined;
    this.verified = undefined;
    this.currentIndex = 0;
    this.srcEncoding = 'Utf8';
    this.destEncoding = 'Utf8';
    this.algorithm = 'Plain';
    this.fileName = '';
    this.pubKeys = [];
    this.privKeys = []    
  }
  ngOnInit() {


    this.pgpService.listPrivKeys().subscribe(
      (ret: string[]) => { this.privKeys = ret; }
    );
    this.pgpService.listPubKeys().subscribe(
      (ret: string[]) => { this.pubKeys = ret; }
    );

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
  this.dectext = undefined;
  this.verified = undefined;
  this.pgpService.decryptAsym(this.privKey, this.enctext).subscribe( {
    next: (v) => this.dectext = v,
    error: (e) => this.dectext = e.error }
  );
}
encode() {
  this.pgpService.encryptAsym(this.pubKey, this.origtext).subscribe( {
    next: (v) => this.enctext = v ,
    error: (e) => this.enctext = e.error
   } );
}
sign() {
  this.pgpService.signAsym(this.pubKey, this.origtext).subscribe( {
    next: (v) => { this.enctext = v; console.log(v); },
    error: (e) => this.enctext = e.error
  }
  );
}
verify() {
  this.dectext = undefined;
  this.verified = undefined;
  this.pgpService.verifyAsym(this.pubKey, this.enctext, this.origtext).subscribe(
    { next: v => this.verified = v.result ? (v.result == 'OK' ? 'valid':'invalid'): 'uncertain',
      error: e => { this.verified = 'error'; this.dectext = e.error }
    });
}

hex2a(hexx: String) { 
  var str = '';     
  for (var i = 0; i < hexx.length; i += 2)  {  
    str += String.fromCharCode(parseInt(hexx.slice(i, i+2), 16)); 
  }
  return str; 
}
}