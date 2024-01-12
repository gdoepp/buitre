import { Component, OnInit } from '@angular/core';
import { SignAlg } from '../../kryptutil-api-out/model/signAlg';
import { KryptBase } from '../KryptBase';
import { AppClaim} from '../appClaims';
import { TokenRequest } from '../../kryptutil-api-out/model/tokenRequest';
import { TokenService } from '../../kryptutil-api-out/api/token.service';
import { RequestedClaim } from '../../kryptutil-api-out/model/requestedClaim';

@Component({
  selector: 'jwt-create',
  templateUrl: './jwt-create.component.html',
  styleUrls: ['./jwt-create.component.css']
})
export class JwtCreateComponent extends KryptBase implements OnInit {

    public username: string;
    public privkey: string;
    public reason: string|null;
    public claim: string;
    public myClaims: AppClaim[];
    public req: TokenRequest;
    public clname: string;
    public algorithm: string;
    public privkeys: string[];
    public pubkey: string;
  
    constructor(protected tokenService: TokenService) {
      super();
      this.username = '';
      this.privkey = '';
      this.pubkey = '';
      this.reason = '';
      this.claim = '';
      this.myClaims = [];
      this.req = {};
      this.clname = '';
      this.algorithm = 'Plain';
      this.privkeys = [];
      this.tokenService.listAlgs().subscribe( (ret: SignAlg[]) => { this.signers = ret; } );
    }
  
    ngOnInit() {
      this.username = '';
      this.myClaims = [];
  
      this.tokenService.listPrivkeys().subscribe(
        (ret: string[]) => { this.privkeys = ret;  }
      );
    
    }
  
    addClaim() {
      let claim = { name: this.clname, value: '' };
      this.myClaims.push(claim);
    }
  
    create_token() {
  
      let tokenReq: TokenRequest = this.req;
      console.log(this);
  
      if (this.keyusage == 'name') {
        tokenReq.alg = 'keystore';
        tokenReq.key = this.privkey;
      } else {
        tokenReq.alg = this.signers[this.keyalg].name;
        if (this.signers[this.keyalg].minLen>0) {
          tokenReq.key = super.decodeKey64(this.privkey);
        } else {
          tokenReq.key = '';
        }
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
      {
        next: (ret: any ) => { console.log('next: ' + JSON.stringify(ret)); this.tokenstring = ret.token; this.pubkey = ret.pubkey; }, 
        error: (err: any) => { console.log('error: ' + JSON.stringify(err)); this.tokenstring = err.error.error + "\n" + err.message;}
      }
      );
  
  }
   
}
