import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromWorkoutRoutine from './workout-routine.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WorkoutRoutineEffects } from './workout-routine.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromWorkoutRoutine.exerciseRoutineKey,
      fromWorkoutRoutine.exerciseReducer
    ),
    EffectsModule.forFeature([WorkoutRoutineEffects]),
  ],
})
export class WorkoutRoutineModule {}
