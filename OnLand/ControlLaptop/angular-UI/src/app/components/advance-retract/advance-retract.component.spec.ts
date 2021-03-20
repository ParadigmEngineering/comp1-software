import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceRetractComponent } from './advance-retract.component';

describe('AdvanceRetractComponent', () => {
  let component: AdvanceRetractComponent;
  let fixture: ComponentFixture<AdvanceRetractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceRetractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceRetractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
