import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtCheckComponent } from './jwt-check.component';
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
import { AsymkeyComponent } from '../asymkey/asymkey.component';
import { TokenService } from 'src/kryptutil-api-out';
import { TokenServiceMock } from '../token.mock.service';

describe('JwtCheckComponent', () => {
  let component: JwtCheckComponent;
  let fixture: ComponentFixture<JwtCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtCheckComponent, AsymkeyComponent ],
      imports: [BrowserAnimationsModule, CommonModule, FormsModule, NxExpertModule,
        NxTabsModule,
        NxRadioModule,
        NxFormfieldModule,
        NxGridModule,
        NxDropdownModule],
      providers:  [    provideHttpClient(withInterceptorsFromDi()),
        { provide: TokenService, useClass: TokenServiceMock },  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JwtCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
