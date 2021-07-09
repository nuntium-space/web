import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPublicPageComponent } from './author-public-page.component';

describe('AuthorPublicPageComponent', () => {
  let component: AuthorPublicPageComponent;
  let fixture: ComponentFixture<AuthorPublicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorPublicPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorPublicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
