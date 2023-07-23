import { SignAlg } from './../kryptutil-api-out/model/signAlg';


export class KryptBase {
    public tokenstring: string;
    public key: string;
    public keyalg: string;
    public keyusage: string;
    public keyform: string;
    public keyforms: any[];
    public signers: SignAlg[] = []; 
  
    constructor() {
        this.tokenstring = '';
        this.key = '';
        this.keyalg = 'HS256';
        this.keyusage = 'name';
        this.keyform = 'base64';
        this.keyforms = [{name:'chars', description: 'plain chars'}, {name:'hex',description:'hex big integer'}, {name:'base64', description:'base64 or pkcs8 pem'}];
    
    }

    decodeKey64(key: string) {
        if (this.keyform == 'hex') {
            key = btoa(this.hex2a(key));
        } else if (this.keyform == 'base64') {
          // keep key
        } else {
            key = btoa(key);
        }
        return key;
    }
      
    hex2a(hexx: string) { 
      var str = '';     
      for (var i = 0; i < hexx.length; i += 2)  {  
        str += String.fromCharCode(parseInt(hexx.substr(i, 2), 16)); 
      }
      return str; 
    }
    
}