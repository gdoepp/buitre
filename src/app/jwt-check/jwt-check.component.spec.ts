import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtCheckComponent } from './jwt-check.component';

describe('JwtCheckComponent', () => {
  let component: JwtCheckComponent;
  let fixture: ComponentFixture<JwtCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtCheckComponent ]
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
