import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleDetailsComponent } from './details.component';

describe('BundleDetailsComponent', () => {
  let component: BundleDetailsComponent;
  let fixture: ComponentFixture<BundleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BundleDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
