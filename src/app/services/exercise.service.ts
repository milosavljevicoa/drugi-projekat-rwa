import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, zip, concat } from 'rxjs';
import Exercise from '../models/exercise.model';
import { catchError, map, tap, mergeMap, concatAll } from 'rxjs/operators';

interface MuscleGroupDTO {
  muscles: string;
}
interface ExerciseDTO {
  id: number;
  name: string;
  muscleGroupsIds: Array<number>;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private dbUrl = 'api';
  private excerciseUrl = `${this.dbUrl}/excercises`;
  private muscleGroupUrl = `${this.dbUrl}/muscleGroups`;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'database api', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
  }

  getAllExcercises$(): Observable<Exercise> {
    return this.http.get<Array<ExerciseDTO>>(this.excerciseUrl).pipe(
      map((exercises: Array<ExerciseDTO>) => {
        return exercises.map((exercise: ExerciseDTO) => {
          return {
            ...exercise,
            name: this.capitalizeFirstLetterOfEveryWord(exercise.name),
          };
        });
      }),
      concatAll(),
      mergeMap((exercise: ExerciseDTO) => {
        return this.getMuscleGroupsForExercise(exercise.muscleGroupsIds).pipe(
          map(
            (muscleGourps: Array<string>) =>
              new Exercise(exercise.id, exercise.name, muscleGourps)
          )
        );

        // return zip(
        //   ...exercise.map((exercise: ExerciseDTO) => {
        //     return this.getMuscleGroupsForExercise(exercise.id).pipe(
        //       map((muscleGroup: Array<string>) => {
        //         const ex = new Exercise(exercise.id, exercise.name, [
        //           ...muscleGroup,
        //         ]);
        //         console.log(ex);
        //         return ex;
        //         // return { ...exercise, targetedMuscels: muscleGroup };
        //       }),
        //       tap((x: Exercise) => console.log(x))
        //     );
        //   })
        // );
      }),
      catchError(
        this.handleError<Exercise>('getAllExcercises', new Exercise(-1, '', []))
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

  capitalizeFirstLetterOfEveryWord(text: string): string {
    const modifiedText = text
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return modifiedText;
  }
}
