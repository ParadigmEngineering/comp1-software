import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinActualMaxComponent } from './min-actual-max.component';

describe('MinActualMaxComponent', () => {
  let component: MinActualMaxComponent;
  let fixture: ComponentFixture<MinActualMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinActualMaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinActualMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
