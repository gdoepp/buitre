import { Component } from '@angular/core';
import { KryptBase } from '../KryptBase';

@Component({
  selector: 'code-asym',
  templateUrl: './code-asym.component.html',
  styleUrls: ['./code-asym.component.css']
})
export class CodeASymComponent extends KryptBase {
public pubkeys : string[] = [];
public pubkey: string = '';
}
