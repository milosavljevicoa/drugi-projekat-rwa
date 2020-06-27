import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as workoutRoutine from './workout-routine/workout-routine.reducer';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
