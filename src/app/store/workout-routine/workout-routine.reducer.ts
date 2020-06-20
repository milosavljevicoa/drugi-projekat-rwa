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
  on(addExercise, (state, action) => {
    if (!state.includes(action.exercise)) [...state, action.exercise];
    return state;
  }),
  on(removeExercise, (state, action) =>
    state.filter((exercise: Exercise) => exercise.id !== action.exercise.id)
  ),
  on(removeAll, (state) => new Array<Exercise>())
);

export function exerciseReducer(state: Array<Exercise>, action) {
  return _counterReducer(state, action);
}
