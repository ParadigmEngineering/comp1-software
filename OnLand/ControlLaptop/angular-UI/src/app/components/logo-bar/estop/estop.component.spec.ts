import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstopComponent } from './estop.component';

describe('EstopComponent', () => {
  let component: EstopComponent;
  let fixture: ComponentFixture<EstopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
