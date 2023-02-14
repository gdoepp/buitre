import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSymComponent } from './code-sym.component';

describe('CodeSymComponent', () => {
  let component: CodeSymComponent;
  let fixture: ComponentFixture<CodeSymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSymComponent ]
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
