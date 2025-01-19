import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent  implements OnInit {
  title = 'Crypto-App';
  public currentIndex: number;

  constructor() {
    this.currentIndex = 0;
  }

  ngOnInit() {
  }


}
