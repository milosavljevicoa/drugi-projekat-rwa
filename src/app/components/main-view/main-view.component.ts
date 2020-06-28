import { Component, OnInit } from '@angular/core';

import { ExerciseService } from 'src/app/services/exercise.service';
import Exercise from 'src/app/models/exercise.model';

import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, map, tap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as ExerciseActions from '../../store/workout-routine/workout-routine.action';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';
import { AppState } from 'src/app/store';
import {
  selectExerciseWorkout,
  selectNumberOfExercises,
} from 'src/app/store/workout-routine/workout-routine.selectors';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  public exerciseToDisplay: Array<Exercise>;
  public showLoadingSpinner: boolean = true;

  private searchedExercises$: Subject<string>;
  private selectedExercisesForWorkout$: Observable<Array<ExerciseWorkout>>;

  constructor(
    private exerciseService: ExerciseService,
    private exerciseStore: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.selectedExercisesForWorkout$ = this.exerciseStore.pipe(
      select(selectExerciseWorkout)
    );

    this.searchedExercises$ = new Subject();
    this.searchedExercises$
      .pipe(
        tap((_) => {
          this.showLoadingSpinner = true;
          this.exerciseToDisplay = [];
        }),
        debounceTime(200),
        switchMap((exerciseName: string) => {
          return this.exerciseService.getQueriedExercises$(exerciseName);
        }),
        switchMap((exercisesToDisplay: Array<Exercise>) => {
          return this.selectedExercisesForWorkout$.pipe(
            map((exericsesPicked: Array<ExerciseWorkout>) =>
              this.getExercisesToDisplay(exercisesToDisplay, exericsesPicked)
            )
          );
        })
      )
      .subscribe((exercises: Array<Exercise>) => {
        this.showLoadingSpinner = false;
        this.exerciseToDisplay = exercises;
      });

    this.searchExerciseByName('');
  }

  getExercisesToDisplay(
    allExercisesThatMayBeDisplayed: Array<Exercise>,
    exercisesThatArePicked: Array<Exercise>
  ): Array<Exercise> {
    return allExercisesThatMayBeDisplayed.filter(
      (exercise: Exercise) =>
        !this.isExerciseInPickedExercises(exercise, exercisesThatArePicked)
    );
  }

  isExerciseInPickedExercises(
    exerciseToCheck: Exercise,
    pickedExercises: Array<Exercise>
  ): boolean {
    let isExercisesPicked: boolean = false;
    pickedExercises.forEach((singleExercisePicked: ExerciseWorkout) => {
      if (exerciseToCheck.id === singleExercisePicked.id) {
        isExercisesPicked = true;
        return;
      }
    });
    return isExercisesPicked;
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
