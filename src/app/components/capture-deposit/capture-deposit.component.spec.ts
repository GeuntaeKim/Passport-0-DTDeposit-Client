import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureDepositComponent } from './capture-deposit.component';

describe('CaptureDepositComponent', () => {
  let component: CaptureDepositComponent;
  let fixture: ComponentFixture<CaptureDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
