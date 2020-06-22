import { Component, OnInit, Input } from '@angular/core';
import { ExerciseWorkout } from 'src/app/models/exercise-workout.model';

@Component({
  selector: 'app-exercise-workout',
  templateUrl: './exercise-workout.component.html',
  styleUrls: ['./exercise-workout.component.css'],
})
export class ExerciseWorkoutComponent implements OnInit {
  @Input() exerciseWorkout: ExerciseWorkout;
  public numberOfReps: Array<number>;

  constructor() {}

  ngOnInit(): void {
    this.updateNumberOfSets();
    console.log(this.exerciseWorkout);
  }

  updateNumberOfSets() {
    this.numberOfReps = [
      ...Array(this.exerciseWorkout.setsAndReps.sets).keys(),
    ].map((i: number) => i + 1);
  }

  increaseNumberOfSets(): void {
    this.exerciseWorkout.setsAndReps.incrementSets();
    this.updateNumberOfSets();
  }

  decreaseNumberOfSets(): void {
    this.exerciseWorkout.setsAndReps.decrementSets();
    this.updateNumberOfSets();
  }

  increaseNumberOfReps(index: number): void {
    this.exerciseWorkout.setsAndReps.incrementReps(index);
  }

  decreaseNumberOfReps(index: number): void {
    this.exerciseWorkout.setsAndReps.decrementReps(index);
  }
}
