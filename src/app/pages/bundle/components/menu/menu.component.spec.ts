import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleMenuComponent } from './menu.component';

describe('BundleMenuComponent', () => {
  let component: BundleMenuComponent;
  let fixture: ComponentFixture<BundleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BundleMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
