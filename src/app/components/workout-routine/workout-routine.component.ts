import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import ExerciseWorkout from 'src/app/models/exercise-workout.model';

import * as WorkoutActions from 'src/app/store/workout-routine/workout-routine.action';
import { AppState } from 'src/app/store';
import { selectExerciseWorkout } from 'src/app/store/workout-routine/workout-routine.selectors';
import { WokroutRoutineState } from 'src/app/store/workout-routine/workout-routine.reducer';
@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.component.html',
  styleUrls: ['./workout-routine.component.css'],
})
export class WorkoutRoutineComponent implements OnInit {
  public numberOfSets: number;
  public numberOfReps: number;
  public totalEffort: number;
  public exercisesToDisplay: Array<ExerciseWorkout>;

  public selectedExercises$: Observable<any>;

  constructor(private exerciseStore: Store<WokroutRoutineState>) {}

  ngOnInit(): void {
    this.numberOfReps = this.numberOfSets = this.totalEffort = 0;

    this.selectedExercises$ = this.exerciseStore.pipe(
      select(selectExerciseWorkout)
    );

    this.selectedExercises$.subscribe((exercises: Array<ExerciseWorkout>) => {
      this.exercisesToDisplay = exercises;
      // this.updateProgress(this.exercisesToDisplay);
    });
  }

  removeExerciseFromWorkoutRoutine(exercise: ExerciseWorkout): void {
    this.exerciseStore.dispatch(
      WorkoutActions.removeExercise({ exerciseId: exercise.id })
    );
  }

  updateRepsAndSets(exercise: ExerciseWorkout): void {
    this.exerciseStore.dispatch(
      WorkoutActions.updateExercise({
        exercise,
      })
    );
  }

  updateProgress(exercises: Array<ExerciseWorkout>): void {
    if (exercises.length === 0) return;
    this.numberOfReps = 0;
    this.numberOfSets = 0;
    this.totalEffort = 0;
    exercises.forEach((exercise: ExerciseWorkout) =>
      this.updateProgressBasedOnExercise(exercise)
    );
  }

  updateProgressBasedOnExercise(exercise: ExerciseWorkout): void {
    const { setsAndReps } = exercise;
    this.numberOfSets += setsAndReps.sets;
    this.numberOfReps += setsAndReps.reps.reduce(this.calculateSum);
    this.totalEffort += setsAndReps.efforts.reduce(this.calculateSum);
  }

  calculateSum(previuosValue: number, currentValue: number): number {
    return (previuosValue += currentValue);
  }
}
