import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicIconComponent } from './schematic-icon.component';

describe('SchematicIconComponent', () => {
  let component: SchematicIconComponent;
  let fixture: ComponentFixture<SchematicIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchematicIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchematicIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
