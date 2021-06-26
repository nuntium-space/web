import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPublishersComponent } from './for-publishers.component';

describe('ForPublishersComponent', () => {
  let component: ForPublishersComponent;
  let fixture: ComponentFixture<ForPublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForPublishersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
