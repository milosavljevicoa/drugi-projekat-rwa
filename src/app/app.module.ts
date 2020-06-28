import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './components/app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { WorkoutRoutineComponent } from './components/workout-routine/workout-routine.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { ExerciseWorkoutComponent } from './components/exercise-workout/exercise-workout.component';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { WorkoutRoutineModule } from './store/workout-routine/workout-routine.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ExerciseComponent,
    WorkoutRoutineComponent,
    ExerciseWorkoutComponent,
    LoadingSpinnerComponent,
    NavBarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule,
    WorkoutRoutineModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
