import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRecordTableComponent } from './track-record-table.component';

describe('TrackRecordTableComponent', () => {
  let component: TrackRecordTableComponent;
  let fixture: ComponentFixture<TrackRecordTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackRecordTableComponent]
    });
    fixture = TestBed.createComponent(TrackRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
