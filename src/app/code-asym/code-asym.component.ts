import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { SignAlg } from '../model/SignAlg';
import { EncryptService } from '../encrypt.service';


@Component({
  selector: 'code-asym',
  templateUrl: './code-asym.component.html',
  styleUrls: ['./code-asym.component.css']
})
export class CodeAsymComponent implements OnInit {

  public reason: string|null;
  public key: string;
  public inptext: string;
  public outtext: string;
  public currentIndex: number;
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

  constructor(protected encryptService: EncryptService) {
    this.reason = '';
    this.key = '';
    this.keyalg = 'HS256';
    this.keyusage = 'name';
    this.keyform = 'base64';
    this.keyforms = [{name:'chars', description: 'plain chars'}, {name:'hex',description:'hex big integer'}, {name:'base64', description:'base64 or pkcs8 pem'}];
    this.inptext = '';
    this.outtext = '';
    this.currentIndex = 0;
    this.srcEncoding = 'Utf8';
    this.destEncoding = 'Utf8';
    this.algorithm = 'Plain';
    this.encodings = encryptService.listEnc();
    this.encryptings = encryptService.listCrypt();
    this.hashings = encryptService.listHash();
  }

  ngOnInit() {
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

}
encode() {
  if  (this.hashings.indexOf(this.algorithm) >= 0) {
    this.outtext = this.encryptService.hash(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  } else {
    this.outtext = this.encryptService.encrypt(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  } 

}

hex2a(hexx: String) { 
  var str = '';     
  for (var i = 0; i < hexx.length; i += 2)  {  
    str += String.fromCharCode(parseInt(hexx.substr(i, 2), 16)); 
  }
  return str; 
}

}
