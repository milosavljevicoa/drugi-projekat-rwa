import { createAction, props } from '@ngrx/store';
import ExerciseWorkout from 'src/app/models/exercise-workout.model';
import Exercise from 'src/app/models/exercise.model';
import { Update } from '@ngrx/entity';

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
  props<{ exerciseId: number }>()
);
export const updateExercise = createAction(
  '[workout-routine component ] Update Exercise Success',
  props<{ exercise: ExerciseWorkout }>()
);
export const updateExerciseSuccesss = createAction(
  '[WorkoutRoutineEffect] Update Exercise Success',
  props<{ exercise: Update<ExerciseWorkout> }>()
);
export const removeAll = createAction(
  '[main-view component] remove all exercise'
);
