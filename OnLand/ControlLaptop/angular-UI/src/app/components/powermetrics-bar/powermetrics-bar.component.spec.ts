import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMetricsBarComponent } from './powermetrics-bar.component';

describe('PowerMetricsBarComponent', () => {
  let component: PowerMetricsBarComponent;
  let fixture: ComponentFixture<PowerMetricsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerMetricsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMetricsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
