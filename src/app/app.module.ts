import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { NxTabsModule } from '@aposin/ng-aquila/tabs'; 
import { NxRadioModule } from '@aposin/ng-aquila/radio-button'; 
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown'; 
import { NxGridModule } from '@aposin/ng-aquila/grid'; 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    NxExpertModule,
    NxTabsModule,
    NxRadioModule,
    NxFormfieldModule,
    NxGridModule,
    NxDropdownModule
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
