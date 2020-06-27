import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, act } from '@ngrx/effects';

import * as ExerciseRoutineActions from './workout-routine.action';

import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import Exercise from 'src/app/models/exercise.model';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';
import SetsAndReps from 'src/app/models/sets-and-reps.model';

@Injectable()
export class WorkoutRoutineEffects {
  constructor(
    private actions$: Actions,
    private exerciseService: ExerciseService
  ) {}

  addExerciseWithSetsAndRepsToRoutine: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExerciseRoutineActions.addExercise),
      map((action) => action.exercise),
      mergeMap((exercise: Exercise) => {
        return this.exerciseService.getSetsAndRepsForExercise$(exercise);
      }),
      mergeMap((exerciseWorkout: ExerciseWorkout) =>
        of(
          ExerciseRoutineActions.addExerciseSuccess({
            exercise: exerciseWorkout,
          })
        )
      ),
      catchError(() => EMPTY)
    )
  );

  updateSetsAndRepsForExercise: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExerciseRoutineActions.updateExercise),
      map((action) => action.exercise),
      mergeMap((exerciseToUpdate: ExerciseWorkout) =>
        this.exerciseService
          .updateSetsAndRepsForExercise$(exerciseToUpdate)
          .pipe(map((_) => exerciseToUpdate))
      ),
      mergeMap((updatedExercise: ExerciseWorkout) =>
        of(
          ExerciseRoutineActions.updateExerciseSuccesss({
            exercise: {
              id: updatedExercise.id,
              changes: updatedExercise,
            },
          })
        )
      ),
      catchError(() => EMPTY)
    )
  );
}
