import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicsPageComponent } from './schematics-page.component';

describe('SchematicsPageComponent', () => {
  let component: SchematicsPageComponent;
  let fixture: ComponentFixture<SchematicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchematicsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchematicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
