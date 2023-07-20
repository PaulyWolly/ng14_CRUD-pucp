import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPostLoginComponent } from './register-post-login.component';

describe('RegisterComponent', () => {
  let component: RegisterPostLoginComponent;
  let fixture: ComponentFixture<RegisterPostLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPostLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPostLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
