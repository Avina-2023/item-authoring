import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonuploadComponent } from './commonupload.component';

describe('CommonuploadComponent', () => {
  let component: CommonuploadComponent;
  let fixture: ComponentFixture<CommonuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
