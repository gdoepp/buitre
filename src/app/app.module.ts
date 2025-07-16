import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {FilterPipe } from './filterpipe';

import { TokenService } from './../kryptutil-api-out/api/token.service';
import { PgpService } from './../kryptutil-api-out/api/pgp.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NxExpertModule } from '@allianz/ng-aquila/config';
import { NxTabsModule } from '@allianz/ng-aquila/tabs'; 
import { NxRadioModule } from '@allianz/ng-aquila/radio-button'; 
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown'; 
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { JwtCreateComponent } from './jwt-create/jwt-create.component';
import { JwtCheckComponent } from './jwt-check/jwt-check.component';
import { CodeSymComponent } from './code-sym/code-sym.component';
import { CodeASymComponent } from './code-asym/code-asym.component';
import { AsymkeyComponent } from './asymkey/asymkey.component'; 
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';

@NgModule({ declarations: [
        AppComponent,
        JwtCreateComponent,
        JwtCheckComponent,
        CodeSymComponent,
        CodeASymComponent,
        AsymkeyComponent,
        FilterPipe,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
        NxExpertModule,
        NxTabsModule,
        NxRadioModule,
        NxCheckboxModule,
        NxFormfieldModule,
        NxGridModule,
        NxDropdownModule], providers: [TokenService, PgpService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
