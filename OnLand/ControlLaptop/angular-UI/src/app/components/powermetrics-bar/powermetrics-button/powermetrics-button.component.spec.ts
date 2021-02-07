import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMetricsButtonComponent } from './powermetrics-button.component';

describe('PowerMetricsButtonComponent', () => {
  let component: PowerMetricsButtonComponent;
  let fixture: ComponentFixture<PowerMetricsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerMetricsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMetricsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
