import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PgpService } from '../../kryptutil-api-out/api/pgp.service';
import { SignAlg } from '../../kryptutil-api-out/model/signAlg';
import { randomString } from '@aposin/ng-aquila/utils';

@Component({
  selector: 'asymkey',
  templateUrl: './asymkey.component.html',
  styleUrls: ['./asymkey.component.css']
})
export class AsymkeyComponent {

  public keyforms: any[];
  
  private _pkey : string = '';
  private _keyform: string = 'base64';
  private _keyalg: number = 0;
  private _keyusage: string = 'name';
  public sid = "";

  @Input() public mode: string;
  @Input() public pkeys: string[];
  @Input() public signers: SignAlg[] = [];
  
  @Input() public get pkey() { return this._pkey; }
  @Output() pkeyChange = new EventEmitter<string>();
  public set pkey(s: string) { if (s !== this._pkey) this.pkeyChange.emit(s); this._pkey = s; }

  @Input() public get keyform() { return this._keyform; }
  @Output() keyformChange = new EventEmitter<string>();
  public set keyform(s: string) {  if (s !== this._keyform) this.keyformChange.emit(s); this._keyform = s;}
  
  @Input() public get keyalg() { return this._keyalg; }
  @Output() keyalgChange = new EventEmitter<number>();
  public set keyalg(j: number) { if (j !== this._keyalg) this.keyalgChange.emit(j); this._keyalg = j; }
  @Input() public get keyusage() { return this._keyusage; }
  @Output() keyusageChange = new EventEmitter<string>();
  public set keyusage(s: string) { if (s !== this._keyusage) this.keyusageChange.emit(s); this._keyusage = s; }
  

  constructor(private pgpService: PgpService) {
    this.pkeys = [];
    this.mode = "x";
    this.sid = randomString();
    this.keyforms = [{name:'chars', description: 'plain chars'}, {name:'hex',description:'hex big integer'}, {name:'base64', description:'base64 or pkcs8 pem'}];
  }
}
