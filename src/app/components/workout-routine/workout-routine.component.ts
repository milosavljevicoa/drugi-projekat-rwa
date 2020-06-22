import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Exercise from 'src/app/models/exercise.model';
import { Store, select } from '@ngrx/store';
import {
  ExerciseWorkout,
  SetsAndReps,
} from 'src/app/models/exercise-workout.model';

@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.component.html',
  styleUrls: ['./workout-routine.component.css'],
})
export class WorkoutRoutineComponent implements OnInit {
  public selectedExercises$: Observable<Array<Exercise>>;
  public test: ExerciseWorkout;
  constructor(private exerciseStore: Store<{ exercise: Array<Exercise> }>) {}

  ngOnInit(): void {
    this.selectedExercises$ = this.exerciseStore.pipe(select('exercise'));
    this.test = ExerciseWorkout.createExericseWorkout(
      new Exercise(0, 'test', ['test1', 'test2']),
      new SetsAndReps(0, 3, [3, 4, 5], [20, 15, 12], false)
    );
  }
}
