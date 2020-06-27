import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WokroutRoutineState,
  exerciseRoutineKey,
  exerciseAdapter,
} from './workout-routine.reducer';

export const selectExerciseFeatue = createFeatureSelector<WokroutRoutineState>(
  exerciseRoutineKey
);

export const selectExerciseWorkout = createSelector(
  selectExerciseFeatue,
  exerciseAdapter.getSelectors().selectAll
);
