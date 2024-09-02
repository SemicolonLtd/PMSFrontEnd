import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBarComponent } from './center-bar.component';

describe('CenterBarComponent', () => {
  let component: CenterBarComponent;
  let fixture: ComponentFixture<CenterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenterBarComponent]
    });
    fixture = TestBed.createComponent(CenterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
