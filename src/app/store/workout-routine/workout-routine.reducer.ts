import { createReducer, on } from '@ngrx/store';
import {
  addExercise,
  removeAll,
  removeExercise,
} from './workout-routine.action';
import Exercise from 'src/app/models/exercise.model';

export const initialState: Array<Exercise> = new Array();

const _counterReducer = createReducer(
  initialState,
  on(addExercise, (state, action) => [...state, action.exercise]),
  on(removeExercise, (state, action) =>
    state.filter((exercise: Exercise) => exercise.id !== action.exercise.id)
  ),
  on(removeAll, (state) => new Array<Exercise>())
);

export function exerciseReducer(state: Array<Exercise>, action) {
  return _counterReducer(state, action);
}
