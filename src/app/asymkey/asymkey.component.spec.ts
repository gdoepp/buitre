import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsymkeyComponent } from './asymkey.component';

describe('AsymkeyComponent', () => {
  let component: AsymkeyComponent;
  let fixture: ComponentFixture<AsymkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsymkeyComponent ]
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
