import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBusinessCategoryComponent } from './core-business-category.component';

describe('CoreBusinessCategoryComponent', () => {
  let component: CoreBusinessCategoryComponent;
  let fixture: ComponentFixture<CoreBusinessCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreBusinessCategoryComponent]
    });
    fixture = TestBed.createComponent(CoreBusinessCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
