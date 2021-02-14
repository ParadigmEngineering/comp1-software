import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatDetectionComponent } from './heartbeat-detection.component';

describe('HeartbeatDetectionComponent', () => {
  let component: HeartbeatDetectionComponent;
  let fixture: ComponentFixture<HeartbeatDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbeatDetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
