import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { JwtCreateComponent } from './jwt-create/jwt-create.component';
import { JwtCheckComponent } from './jwt-check/jwt-check.component';
import { CodeSymComponent } from './code-sym/code-sym.component';
import { CodeAsymComponent } from './code-asym/code-asym.component'; 

@NgModule({
  declarations: [
    AppComponent,
    JwtCreateComponent,
    JwtCheckComponent,
    CodeSymComponent,
    CodeAsymComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
