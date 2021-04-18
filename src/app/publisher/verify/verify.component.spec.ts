import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherVerifyComponent } from './verify.component';

describe('PublisherVerifyComponent', () => {
  let component: PublisherVerifyComponent;
  let fixture: ComponentFixture<PublisherVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
