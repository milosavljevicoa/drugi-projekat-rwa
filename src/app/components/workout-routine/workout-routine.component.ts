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
  public selectedExercisesForWorkout$: Observable<Array<ExerciseWorkout>>;

  constructor(private exerciseStore: Store<WokroutRoutineState>) {}

  ngOnInit(): void {
    this.selectedExercisesForWorkout$ = this.exerciseStore.pipe(
      select(selectExerciseWorkout)
    );
  }

  handleRemoveExerciseFromWorkoutRoutine(exercise: ExerciseWorkout): void {
    this.exerciseStore.dispatch(
      WorkoutActions.removeExercise({ exerciseId: exercise.id })
    );
  }

  handleUpdateRepsAndSets(exercise: ExerciseWorkout): void {
    this.exerciseStore.dispatch(
      WorkoutActions.updateExercise({
        exercise,
      })
    );
  }
}
