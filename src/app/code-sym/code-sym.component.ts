import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { SignAlg } from '../../kryptutil-api-out/model/signAlg';
import { EncryptService } from '../encrypt.service';
import * as FileSaver from 'file-saver';


@Component({
    selector: 'code-sym',
    templateUrl: './code-sym.component.html',
    styleUrls: ['./code-sym.component.css'],
    standalone: false
})
export class CodeSymComponent implements OnInit {

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
  public fileName: string;
  public convertSrc: boolean;

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
    this.fileName = '';
    this.convertSrc = false;
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

onFileSelected(event:Event) {
  const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (reader.result != null)   {
          let binaryString = '';
          if (typeof reader.result === 'string') {
            binaryString = reader.result;
          } else {
            const byteArray = new Uint8Array(reader.result);    
            // Create a binary string from the byte array
            for (let i = 0; i < byteArray.byteLength; i++) {
                binaryString += String.fromCharCode(byteArray[i]);
            }          
          }
          // Convert the binary string to a Base64 string
          if (this.convertSrc) {
            this.inptext = btoa(binaryString);
          } else {
            this.inptext = binaryString;
          }
      }
    }
    reader.readAsArrayBuffer(file);
  }
}

decode() {

  var cleartext = this.encryptService.decrypt(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  if (this.fileName) {
    const blob = new Blob([cleartext], {type: 'application/octet-stream'});
    FileSaver.saveAs(blob, this.fileName);
    this.outtext = 'File saved to ' + this.fileName;
  } else {
    this.outtext = cleartext;
  }
  return;
}

encode() {
  let result: any;
  if  (this.hashings.indexOf(this.algorithm) >= 0) {
    result = this.encryptService.hash(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  } else if (this.algorithm.startsWith("Hmac")) {
    result = this.encryptService.hash(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  } else {
    result = this.encryptService.encrypt(this.inptext, this.decodeKey(this.key), this.algorithm, this.srcEncoding, this.destEncoding);
  } 
  if (this.fileName) {
    const blob = new Blob([result], {type: 'application/octet-stream'});
    FileSaver.saveAs(blob, this.fileName);
    this.outtext = 'File saved to ' + this.fileName;
  } else {
    this.outtext = result;
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
