import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Exercise from 'src/app/models/exercise.model';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.component.html',
  styleUrls: ['./workout-routine.component.css'],
})
export class WorkoutRoutineComponent implements OnInit {
  public selectedExercises$: Observable<Array<Exercise>>;

  constructor(private exerciseStore: Store<{ exercise: Array<Exercise> }>) {}

  ngOnInit(): void {
    this.selectedExercises$ = this.exerciseStore.pipe(select('exercise'));
  }
}
