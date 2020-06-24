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

  public exerciseThatIsDisplayed: ExerciseWorkout;

  constructor() {}

  ngOnInit(): void {
    this.exerciseThatIsDisplayed = this.exercise.makeACopy();
  }

  increaseNumberOfSets(): void {
    this.exerciseThatIsDisplayed.setsAndReps.incrementSets();
  }

  decreaseNumberOfSets(): void {
    this.exerciseThatIsDisplayed.setsAndReps.decrementSets();
  }

  increaseNumberOfReps(index: number): void {
    this.exerciseThatIsDisplayed.setsAndReps.incrementReps(index);
  }

  decreaseNumberOfReps(index: number): void {
    this.exerciseThatIsDisplayed.setsAndReps.decrementReps(index);
  }

  updateSetsAndRepsForExercise(): void {
    this.handleUpdateSetsAndRepsForExercise.emit(this.exerciseThatIsDisplayed);
  }

  removeExerciseFromWorkout(): void {
    this.handleRemoveExerciseFromRoute.emit(this.exerciseThatIsDisplayed);
  }
}
