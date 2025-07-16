import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsymkeyComponent } from './asymkey.component';
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

describe('AsymkeyComponent', () => {
  let component: AsymkeyComponent;
  let fixture: ComponentFixture<AsymkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsymkeyComponent ],
      imports: [BrowserAnimationsModule, CommonModule, FormsModule, NxExpertModule,
        NxTabsModule,
        NxRadioModule,
        NxFormfieldModule,
        NxGridModule,
        NxDropdownModule],
      providers:  [    provideHttpClient(withInterceptorsFromDi()) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsymkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
