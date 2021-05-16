import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLogComponent } from './display-log.component';

describe('DisplayLogComponent', () => {
  let component: DisplayLogComponent;
  let fixture: ComponentFixture<DisplayLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
