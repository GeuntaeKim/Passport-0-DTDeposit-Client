import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScannedImagesComponent } from './view-scanned-images.component';

describe('ViewScannedImagesComponent', () => {
  let component: ViewScannedImagesComponent;
  let fixture: ComponentFixture<ViewScannedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScannedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScannedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
