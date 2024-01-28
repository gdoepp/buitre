import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { KryptBase } from '../KryptBase';
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
  public algo: string;

  constructor(protected tokenService: TokenService) {
    super();
    this.algo = '';
    this.pubkey = '';
    this.reason = '';
    this.valresult = "unknown";
    this.pubkeys = [];
    this.signers = [{name: 'None', minLen: 0, description: 'not signed', usage:'c'}];
    this.keyalg = 0;
  }

  ngOnInit() {

    this.tokenService.listPubkeys().subscribe(
      (ret: string[]) => { this.pubkeys = ret; }
    );

  }
  
chg_token() {
   var found = this.tokenstring.match(/([^.]+)[.]/);
   console.log(found);
   if (found === null) found = ['','?'];
   console.log(atob(found[1]));
   var header = JSON.parse(atob(found[1]));
   if (header.curve) {
    this.algo = header.alg + " curve " + header.curve;
   } else {
    this.algo = header.alg;
   }
}

check_token() {

  var keysrc = '';
  var key = '';
  if (this.keyusage == 'name') {
    keysrc = 'keystore';
    key = this.pubkey;
  } else {
    keysrc = 'bytes';
    key = super.decodeKey64(this.pubkey);
  } 

  this.tokenService.checkJwt(this.tokenstring, key, keysrc, 'response').subscribe(
    (ret: any) => { 
      console.log(ret.body);
      this.valresult = ret.body.result;
      this.reason = ret.body.reason; 
    },
    (err: any) => { console.log('error: ' + JSON.stringify(err)); this.valresult = err.error.result; this.reason = err.error.reason; },
    () => { }
  );
}


}
