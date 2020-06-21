import { Component, OnInit } from '@angular/core';

import { ExerciseService } from 'src/app/services/exercise.service';
import Exercise from 'src/app/models/exercise.model';

import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as ExerciseActions from '../../store/workout-routine/workout-routine.action';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  public exerciseToDisplay: Array<Exercise>;

  private searchedExercises$: Subject<string>;
  private selectedExercises$: Observable<Array<Exercise>>;

  constructor(
    private exerciseService: ExerciseService,
    private exerciseStore: Store<{ exercise: Array<Exercise> }>
  ) {}

  ngOnInit(): void {
    this.selectedExercises$ = this.exerciseStore.pipe(select('exercise'));
    this.selectedExercises$.subscribe((x: Array<Exercise>) => console.log(x));

    this.searchedExercises$ = new Subject();
    this.searchedExercises$
      .pipe(
        debounceTime(500),
        switchMap((exerciseName: string) =>
          this.exerciseService.getQueriedExercises$(exerciseName)
        )
      )
      .subscribe(
        (exercises: Array<Exercise>) => (this.exerciseToDisplay = exercises)
      );

    this.searchExerciseByName('');
  }

  searchExerciseByName(exerciseName: string) {
    this.searchedExercises$.next(exerciseName);
  }

  addExerciseToRoutine(exercise: Exercise) {
    this.exerciseStore.dispatch(
      ExerciseActions.addExercise({ exercise: exercise })
    );
  }
}
