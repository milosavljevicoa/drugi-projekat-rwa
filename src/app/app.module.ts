import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './components/app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { WorkoutRoutineComponent } from './components/workout-routine/workout-routine.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { exerciseReducer } from './store/workout-routine/workout-routine.reducer';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

const reducers: ActionReducerMap<any> = {
  exercise: exerciseReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ExerciseComponent,
    WorkoutRoutineComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
