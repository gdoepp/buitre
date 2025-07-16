import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSymComponent } from './code-sym.component';
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
