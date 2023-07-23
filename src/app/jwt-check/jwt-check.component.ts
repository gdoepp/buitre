import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { KryptBase } from '../KryptBase';
import { SignAlg } from '../../kryptutil-api-out/model/signAlg';
import { TokenService } from '../../kryptutil-api-out/api/token.service';

@Component({
  selector: 'jwt-check',
  templateUrl: './jwt-check.component.html',
  styleUrls: ['./jwt-check.component.css']
})
export class JwtCheckComponent extends KryptBase implements OnInit {

  public valresult: string;
  public reason: string|null;
  public pubkey: string;
  public pubkeys: string[];

  constructor(protected tokenService: TokenService) {
    super();
    this.pubkey = '';
    this.reason = '';
    this.valresult = "unknown";
    this.pubkeys = [];
    this.tokenService.listAlgs().subscribe( (ret: SignAlg[]) => { this.signers = ret; } );
  }

  ngOnInit() {

    this.tokenService.listPubkeys().subscribe(
      (ret: string[]) => { this.pubkeys = ret; }
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
    key = super.decodeKey64(this.pubkey);
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


}
