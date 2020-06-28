import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WokroutRoutineState,
  exerciseAdapter,
} from './workout-routine.reducer';

export const exerciseRoutineKey = 'exerciseSate';

export const selectExerciseFeatue = createFeatureSelector<WokroutRoutineState>(
  exerciseRoutineKey
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = exerciseAdapter.getSelectors();

export const selectExerciseWorkout = createSelector(
  selectExerciseFeatue,
  selectAll
);

export const selectNumberOfExercises = createSelector(
  selectExerciseFeatue,
  (state) => state.numberOfExercises
);
