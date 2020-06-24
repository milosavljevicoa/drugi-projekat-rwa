import { createAction, props } from '@ngrx/store';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';
import Exercise from 'src/app/models/exercise.model';

export const addExercise = createAction(
  '[main-view component] Add Exercise',
  props<{ exercise: Exercise }>()
);
export const addExerciseSuccess = createAction(
  '[WorkoutRoutineEffect] Add Exercise Success',
  props<{ exercise: ExerciseWorkout }>()
);
export const removeExercise = createAction(
  '[main-view component] Remove Exercise',
  props<{ exercise: ExerciseWorkout }>()
);
export const updateExercise = createAction(
  '[exercise-workout component] Update Exercise',
  props<{ exercise: ExerciseWorkout }>()
);
export const updateExerciseSuccess = createAction(
  '[WorkoutRoutineEffect] Update Exercise Success',
  props<{ exercise: ExerciseWorkout }>()
);
export const removeAll = createAction(
  '[main-view component] remove all exercise'
);
