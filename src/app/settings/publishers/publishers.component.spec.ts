import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPublishersComponent } from './publishers.component';

describe('UserPublishersComponent', () => {
  let component: UserPublishersComponent;
  let fixture: ComponentFixture<UserPublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPublishersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
