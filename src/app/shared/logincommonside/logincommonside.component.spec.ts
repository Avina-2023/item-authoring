import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincommonsideComponent } from './logincommonside.component';

describe('LogincommonsideComponent', () => {
  let component: LogincommonsideComponent;
  let fixture: ComponentFixture<LogincommonsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincommonsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincommonsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
