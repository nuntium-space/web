import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInButtonsComponent } from './sign-in-buttons.component';

describe('SignInButtonsComponent', () => {
  let component: SignInButtonsComponent;
  let fixture: ComponentFixture<SignInButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
