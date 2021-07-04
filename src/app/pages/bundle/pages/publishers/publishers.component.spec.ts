import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlePublishersComponent } from './publishers.component';

describe('BundlePublishersComponent', () => {
  let component: BundlePublishersComponent;
  let fixture: ComponentFixture<BundlePublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BundlePublishersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlePublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
