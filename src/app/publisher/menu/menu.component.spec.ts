import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherMenuComponent } from './menu.component';

describe('PublisherMenuComponent', () => {
  let component: PublisherMenuComponent;
  let fixture: ComponentFixture<PublisherMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
