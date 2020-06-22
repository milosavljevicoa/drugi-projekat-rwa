import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseWorkoutComponent } from './exercise-workout.component';

describe('ExerciseWorkoutComponent', () => {
  let component: ExerciseWorkoutComponent;
  let fixture: ComponentFixture<ExerciseWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
