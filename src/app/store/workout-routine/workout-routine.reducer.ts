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
    const newState: Array<Exercise> = [...state, action.exercise];
    if (onlyExerciseInArray(state, action.exercise)) return newState;
    return state;
  }),
  on(removeExercise, (state, action) =>
    state.filter((exercise: Exercise) => exercise.id !== action.exercise.id)
  ),
  on(removeAll, (state) => new Array<Exercise>())
);

function onlyExerciseInArray(
  array: Array<Exercise>,
  exerciseToCheck: Exercise
) {
  let isOnlyOne: boolean = true;
  array.forEach((exericse: Exercise) => {
    if (exericse.id === exerciseToCheck.id) {
      isOnlyOne = false;
      return;
    }
  });
  return isOnlyOne;
}

export function exerciseReducer(state: Array<Exercise>, action) {
  return _counterReducer(state, action);
}
