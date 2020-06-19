import { createAction, props } from '@ngrx/store';
import Exercise from 'src/app/models/exercise.model';

export const addExercise = createAction(
  '[main-view component] Add Exercise',
  props<{ exercise: Exercise }>()
);
export const removeExercise = createAction(
  '[main-view component] Remove Exercise',
  props<{ exercise: Exercise }>()
);
export const removeAll = createAction(
  '[main-view component] remove all exercise'
);
