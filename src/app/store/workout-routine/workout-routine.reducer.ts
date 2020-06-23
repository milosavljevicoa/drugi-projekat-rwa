import { createReducer, on } from '@ngrx/store';
import {
  addExercise,
  removeAll,
  removeExercise,
  addExerciseSuccess,
} from './workout-routine.action';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';

export const initialState: Array<ExerciseWorkout> = new Array();

const _counterReducer = createReducer(
  initialState,
  on(addExercise),
  on(addExerciseSuccess, (state, action) => {
    const newState: Array<ExerciseWorkout> = [...state, action.exercise];
    if (onlyExerciseInArray(state, action.exercise)) return newState;
    return state;
  }),
  on(removeExercise, (state, action) =>
    state.filter(
      (exercise: ExerciseWorkout) => exercise.id !== action.exercise.id
    )
  ),
  on(removeAll, (state) => new Array<ExerciseWorkout>())
);

function onlyExerciseInArray(
  array: Array<ExerciseWorkout>,
  exerciseToCheck: ExerciseWorkout
) {
  let isOnlyOne: boolean = true;
  array.forEach((exericse: ExerciseWorkout) => {
    if (exericse.id === exerciseToCheck.id) {
      isOnlyOne = false;
      return;
    }
  });
  return isOnlyOne;
}

export function exerciseReducer(state: Array<ExerciseWorkout>, action) {
  return _counterReducer(state, action);
}
