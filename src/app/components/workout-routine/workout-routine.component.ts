import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import ExerciseWorkout from 'src/app/models/exercise-workout.model';
import SetsAndReps from 'src/app/models/sets-and-reps';
import Exercise from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import * as WorkoutActions from 'src/app/store/workout-routine/workout-routine.action';
@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.component.html',
  styleUrls: ['./workout-routine.component.css'],
})
export class WorkoutRoutineComponent implements OnInit {
  public selectedExercises$: Observable<Array<ExerciseWorkout>>;
  public test: ExerciseWorkout;

  constructor(
    private exerciseStore: Store<{ exercise: Array<ExerciseWorkout> }>,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.selectedExercises$ = this.exerciseStore.pipe(select('exercise'));
    this.test = ExerciseWorkout.createExericseWorkout(
      new Exercise(0, 'test', ['proba']),
      new SetsAndReps(0, 3, [], [], false)
    );
  }

  removeExerciseFromWorkoutRoutine(exercise: ExerciseWorkout): void {
    this.exerciseStore.dispatch(
      WorkoutActions.removeExercise({ exercise: exercise })
    );
  }

  updateRepsAndSets(exercise: ExerciseWorkout): void {
    this.exerciseService.updateSetsAndRepsForExercise(exercise);
  }
}
