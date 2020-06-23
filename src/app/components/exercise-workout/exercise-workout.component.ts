import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';

@Component({
  selector: 'app-exercise-workout',
  templateUrl: './exercise-workout.component.html',
  styleUrls: ['./exercise-workout.component.css'],
})
export class ExerciseWorkoutComponent implements OnInit {
  @Input() exercise: ExerciseWorkout;
  @Output() handleUpdateSetsAndRepsForExercise: EventEmitter<
    ExerciseWorkout
  > = new EventEmitter();
  @Output() handleRemoveExerciseFromRoute: EventEmitter<
    ExerciseWorkout
  > = new EventEmitter();

  public copyOfExercise: ExerciseWorkout;

  constructor() {}

  ngOnInit(): void {
    this.copyOfExercise = this.exercise.makeACopy();
  }

  increaseNumberOfSets(): void {
    this.copyOfExercise.setsAndReps.incrementSets();
  }

  decreaseNumberOfSets(): void {
    this.copyOfExercise.setsAndReps.decrementSets();
  }

  increaseNumberOfReps(index: number): void {
    this.copyOfExercise.setsAndReps.incrementReps(index);
  }

  decreaseNumberOfReps(index: number): void {
    this.copyOfExercise.setsAndReps.decrementReps(index);
  }

  updateSetsAndRepsForExercise(): void {
    this.handleUpdateSetsAndRepsForExercise.emit(this.exercise);
  }

  removeExerciseFromWorkout(): void {
    this.handleRemoveExerciseFromRoute.emit(this.exercise);
  }
}
