import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAsymComponent } from './code-asym.component';

describe('CodeAsymComponent', () => {
  let component: CodeAsymComponent;
  let fixture: ComponentFixture<CodeAsymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeAsymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeAsymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
