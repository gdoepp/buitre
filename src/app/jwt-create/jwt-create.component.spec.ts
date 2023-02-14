import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtCreateComponent } from './jwt-create.component';

describe('JwtCreateComponent', () => {
  let component: JwtCreateComponent;
  let fixture: ComponentFixture<JwtCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JwtCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
