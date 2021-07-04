import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherPublicPageComponent } from './publisher-public-page.component';

describe('PublisherPublicPageComponent', () => {
  let component: PublisherPublicPageComponent;
  let fixture: ComponentFixture<PublisherPublicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublisherPublicPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherPublicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
