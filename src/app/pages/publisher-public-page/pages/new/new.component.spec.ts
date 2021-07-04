import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteNewArticleComponent } from './new.component';

describe('WriteNewArticleComponent', () => {
  let component: WriteNewArticleComponent;
  let fixture: ComponentFixture<WriteNewArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteNewArticleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteNewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
