import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';
import { AsymkeyComponent } from './asymkey/asymkey.component';
import { CodeASymComponent } from './code-asym/code-asym.component';
import { CodeSymComponent } from './code-sym/code-sym.component';
import { FilterPipe } from './filterpipe';
import { JwtCheckComponent } from './jwt-check/jwt-check.component';
import { JwtCreateComponent } from './jwt-create/jwt-create.component';
import { PgpService, TokenService } from 'src/kryptutil-api-out';
import { TokenServiceMock } from './token.mock.service';
import { PgpServiceMock } from './pgp.mock.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent ,
        JwtCreateComponent,
        JwtCheckComponent,
        CodeSymComponent,
        CodeASymComponent,
        AsymkeyComponent,
        FilterPipe,

      ],
      imports: [BrowserAnimationsModule, CommonModule, FormsModule, NxExpertModule,
        NxTabsModule,
        NxRadioModule,
        NxFormfieldModule,
        NxGridModule,
        NxDropdownModule],
        providers:  [    provideHttpClient(withInterceptorsFromDi()),
          { provide: TokenService, useClass: TokenServiceMock },
          { provide: PgpService, useClass: PgpServiceMock }  ]    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Crypto-App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Crypto-App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Crypto-App');
  });
});
