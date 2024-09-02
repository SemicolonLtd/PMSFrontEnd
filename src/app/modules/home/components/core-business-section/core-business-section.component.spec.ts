import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBusinessSectionComponent } from './core-business-section.component';

describe('CoreBusinessSectionComponent', () => {
  let component: CoreBusinessSectionComponent;
  let fixture: ComponentFixture<CoreBusinessSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreBusinessSectionComponent]
    });
    fixture = TestBed.createComponent(CoreBusinessSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
