import { createReducer, on, State } from '@ngrx/store';
import {
  addExercise,
  removeAll,
  removeExercise,
  addExerciseSuccess,
  updateExercise,
  updateExerciseSuccess,
} from './workout-routine.action';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';

export const initialState: Array<ExerciseWorkout> = new Array();

const _counterReducer = createReducer(
  initialState,
  on(addExercise),
  on(addExerciseSuccess, (state, action) => {
    const newState: Array<ExerciseWorkout> = [...state, action.exercise];
    return doesArrayHaveExercise(state, action.exercise) ? state : newState;
  }),
  on(updateExercise),
  on(updateExerciseSuccess, (state, action) => {
    const updatedExerciseToBePlaced = action.exercise;
    return state.map((exercise: ExerciseWorkout) =>
      exercise.id === updatedExerciseToBePlaced.id
        ? updatedExerciseToBePlaced
        : exercise
    );
  }),
  on(removeExercise, (state, action) =>
    state.filter(
      (exercise: ExerciseWorkout) => exercise.id !== action.exercise.id
    )
  ),
  on(removeAll, () => new Array<ExerciseWorkout>())
);

function doesArrayHaveExercise(
  array: Array<ExerciseWorkout>,
  exerciseToCheck: ExerciseWorkout
) {
  let doesArrayContainExericse: boolean = false;
  array.forEach((exericse: ExerciseWorkout) => {
    if (exericse.id === exerciseToCheck.id) {
      doesArrayContainExericse = true;
      return;
    }
  });
  return doesArrayContainExericse;
}

export function exerciseReducer(state: Array<ExerciseWorkout>, action) {
  return _counterReducer(state, action);
}
