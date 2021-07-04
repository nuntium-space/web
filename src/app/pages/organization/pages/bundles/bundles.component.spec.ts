import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationBundlesComponent } from './bundles.component';

describe('OrganizationBundlesComponent', () => {
  let component: OrganizationBundlesComponent;
  let fixture: ComponentFixture<OrganizationBundlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationBundlesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
