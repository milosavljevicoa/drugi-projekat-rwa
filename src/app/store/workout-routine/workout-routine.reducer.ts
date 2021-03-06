import { createReducer, on } from '@ngrx/store';
import {
  addExerciseSuccess,
  removeExercise,
  updateExerciseSuccesss,
  increaceNumberOfExercises,
  decreaseNumberOfExercises,
} from './workout-routine.action';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface WokroutRoutineState extends EntityState<ExerciseWorkout> {
  numberOfExercises: number;
}

export const exerciseAdapter: EntityAdapter<ExerciseWorkout> = createEntityAdapter<
  ExerciseWorkout
>({
  selectId: (exercise: ExerciseWorkout) => exercise.id,
});

export const initialState = exerciseAdapter.getInitialState({
  numberOfExercises: 0,
});

const _exerciseReducer = createReducer(
  initialState,
  on(addExerciseSuccess, (state, { exercise }) => {
    return exerciseAdapter.addOne(exercise, state);
  }),
  on(updateExerciseSuccesss, (state, { exercise }) => {
    return exerciseAdapter.updateOne(exercise, state);
  }),
  on(removeExercise, (state, { exerciseId }) =>
    exerciseAdapter.removeOne(exerciseId, state)
  ),
  on(increaceNumberOfExercises, (state) => {
    const newNumberOfExercises = state.numberOfExercises + 1;
    return { ...state, numberOfExercises: newNumberOfExercises };
  }),
  on(decreaseNumberOfExercises, (state) => {
    const newNumberOfExercises = state.numberOfExercises - 1;
    return { ...state, numberOfExercises: newNumberOfExercises };
  })
);

export function exerciseReducer(state, action) {
  return _exerciseReducer(state, action);
}
