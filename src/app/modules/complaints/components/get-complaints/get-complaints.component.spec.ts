import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetComplaintsComponent } from './get-complaints.component';

describe('GetComplaintsComponent', () => {
  let component: GetComplaintsComponent;
  let fixture: ComponentFixture<GetComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetComplaintsComponent]
    });
    fixture = TestBed.createComponent(GetComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
