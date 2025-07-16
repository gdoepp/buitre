import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeASymComponent } from './code-asym.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxExpertModule } from '@allianz/ng-aquila/config';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { NxTabsModule } from '@allianz/ng-aquila/tabs';
import { AsymkeyComponent } from '../asymkey/asymkey.component';
import { PgpService } from 'src/kryptutil-api-out';
import { PgpServiceMock } from '../pgp.mock.service';

describe('CodeASymComponent', () => {
  let component: CodeASymComponent;
  let fixture: ComponentFixture<CodeASymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeASymComponent, AsymkeyComponent ],
      imports: [BrowserAnimationsModule, CommonModule, FormsModule, NxExpertModule,
        NxTabsModule,
        NxRadioModule,
        NxFormfieldModule,
        NxGridModule,
        NxDropdownModule],
      providers:  [    provideHttpClient(withInterceptorsFromDi()),
        { provide: PgpService, useClass: PgpServiceMock },  ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeASymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
