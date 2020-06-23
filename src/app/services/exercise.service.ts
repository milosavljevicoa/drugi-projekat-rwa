import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, zip, concat } from 'rxjs';
import Exercise from '../models/exercise.model';
import { catchError, map, mergeMap, concatAll, first } from 'rxjs/operators';
import SetsAndReps from '../models/sets-and-reps';
import ExerciseWorkout from '../models/exercise-workout.model';

interface MuscleGroupDTO {
  muscles: string;
}
interface ExerciseDTO {
  id: number;
  name: string;
  muscleGroupsIds: Array<number>;
}

interface SetsAndRepsDTO {
  id: number;
  sets: number;
  reps: Array<number>;
  effort: Array<number>;
  isExerciseTimed: boolean;
  exerciseId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private dbUrl = 'api';
  private excerciseUrl = `${this.dbUrl}/excercises`;
  private muscleGroupUrl = `${this.dbUrl}/muscleGroups`;
  private setsAndRepsUrl = `${this.dbUrl}/setsAndRepsForExercise`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'database api', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
  }

  getQueriedExercises$(exerciseName: string): Observable<Array<Exercise>> {
    return this.http
      .get<Array<ExerciseDTO>>(`${this.excerciseUrl}?name=${exerciseName}`)
      .pipe(
        mergeMap((exercise: Array<ExerciseDTO>) =>
          this.createExercise(exercise)
        ),
        catchError(this.handleError<Array<Exercise>>('getExcercisesByName', []))
      );
  }

  createExercise(exercises: Array<ExerciseDTO>): Observable<Array<Exercise>> {
    if (exercises.length == 0) return of([this.createNotFoundExercise()]);
    return zip(...this.createExercisesWithMuscleGruops$(exercises));
  }

  createNotFoundExercise(): Exercise {
    const ret: Exercise = new Exercise(-1, 'Not Found', []);
    return ret;
  }

  createExercisesWithMuscleGruops$(
    exercisesDTO: Array<ExerciseDTO>
  ): Array<Observable<Exercise>> {
    return exercisesDTO.map((exercise: ExerciseDTO) =>
      this.getMuscleGroupsForExercise(exercise.muscleGroupsIds).pipe(
        map(
          (muscleGourps: Array<string>) =>
            new Exercise(exercise.id, exercise.name, muscleGourps)
        )
      )
    );
  }

  getMuscleGroupsForExercise(
    exerciseIds: Array<number>
  ): Observable<Array<string>> {
    return zip(
      ...exerciseIds.map((id: number) => {
        return this.http
          .get<Array<MuscleGroupDTO>>(`${this.muscleGroupUrl}?id=${id}`)
          .pipe(
            concatAll(),
            map((x: MuscleGroupDTO) => x.muscles)
          );
      })
    );
  }

  getSetsAndRepsForExercise$(exercise: Exercise): Observable<ExerciseWorkout> {
    return this.http
      .get<Array<SetsAndRepsDTO>>(
        `${this.setsAndRepsUrl}?exerciseId=${exercise.id}`
      )
      .pipe(
        concatAll(),
        first(),
        map((setsAndRepsDTO: SetsAndRepsDTO) => {
          const setsAndReps: SetsAndReps = new SetsAndReps(
            setsAndRepsDTO.id,
            setsAndRepsDTO.sets,
            setsAndRepsDTO.reps,
            setsAndRepsDTO.effort,
            setsAndRepsDTO.isExerciseTimed
          );
          const exerciseWorkout = ExerciseWorkout.createExericseWorkout(
            exercise,
            setsAndReps
          );

          return exerciseWorkout;
        })
      );
  }

  updateSetsAndRepsForExercise(exercise: ExerciseWorkout): Observable<any> {
    const setsAndReps: SetsAndReps = exercise.setsAndReps.makeACopy();
    const updatedSetsAndReps: SetsAndRepsDTO = {
      id: setsAndReps.id,
      sets: setsAndReps.sets,
      isExerciseTimed: setsAndReps.isExerciseTimed,
      effort: [...setsAndReps.efforts],
      reps: [...setsAndReps.reps],
      exerciseId: exercise.id,
    };
    return this.http
      .put<SetsAndRepsDTO>(
        this.setsAndRepsUrl,
        updatedSetsAndReps,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>('updateSetsAndReps')));
  }
}
