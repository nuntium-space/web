import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBundleComponent } from './create.component';

describe('CreateBundleComponent', () => {
  let component: CreateBundleComponent;
  let fixture: ComponentFixture<CreateBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBundleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
