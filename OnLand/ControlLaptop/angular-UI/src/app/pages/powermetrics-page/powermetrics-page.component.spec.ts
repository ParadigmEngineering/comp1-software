import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMetricsPageComponent } from './powermetrics-page.component';

describe('PowerMetricsPageComponent', () => {
  let component: PowerMetricsPageComponent;
  let fixture: ComponentFixture<PowerMetricsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerMetricsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMetricsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
