import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushDepositComponent } from './push-deposit.component';

describe('PushDepositComponent', () => {
  let component: PushDepositComponent;
  let fixture: ComponentFixture<PushDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
