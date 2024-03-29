import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublisherComponent } from './create.component';

describe('CreatePublisherComponent', () => {
  let component: CreatePublisherComponent;
  let fixture: ComponentFixture<CreatePublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePublisherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
