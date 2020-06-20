import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutRoutineComponent } from './workout-routine.component';

describe('WorkoutRoutineComponent', () => {
  let component: WorkoutRoutineComponent;
  let fixture: ComponentFixture<WorkoutRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
