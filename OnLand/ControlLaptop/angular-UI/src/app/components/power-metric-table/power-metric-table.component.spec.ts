import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMetricTableComponent } from './power-metric-table.component';

describe('PowerMetricTableComponent', () => {
  let component: PowerMetricTableComponent;
  let fixture: ComponentFixture<PowerMetricTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerMetricTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMetricTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
