import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceComponent } from './add.component';

describe('AddPriceComponent', () => {
  let component: AddPriceComponent;
  let fixture: ComponentFixture<AddPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPriceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
