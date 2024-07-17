import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSymComponent } from './code-sym.component';
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

describe('CodeSymComponent', () => {
  let component: CodeSymComponent;
  let fixture: ComponentFixture<CodeSymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSymComponent ],
      imports: [BrowserAnimationsModule, CommonModule, FormsModule, NxExpertModule,
        NxTabsModule,
        NxRadioModule,
        NxFormfieldModule,
        NxGridModule,
        NxDropdownModule],
      providers:  [    provideHttpClient(withInterceptorsFromDi()) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeSymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
