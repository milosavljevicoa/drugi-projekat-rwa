import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import Exercise from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    const excercises = [
      { id: 1, name: 'push ups', muscleGroupsIds: [1, 2] },
      { id: 2, name: 'squads', muscleGroupsIds: [3, 4, 5] },
      { id: 3, name: 'pull ups', muscleGroupsIds: [6, 7] },
      { id: 4, name: 'plank', muscleGroupsIds: [8] },
      { id: 5, name: 'bicep curls', muscleGroupsIds: [7] },
      { id: 6, name: 'tricep extensions', muscleGroupsIds: [2] },
      { id: 7, name: 'bench press', muscleGroupsIds: [1, 2] },
      { id: 8, name: 'hip thruster', muscleGroupsIds: [4, 5] },
      { id: 9, name: 'superman', muscleGroupsIds: [9] },
    ];

    const muscleGroups = [
      { id: 1, muscles: 'chest' },
      { id: 2, muscles: 'triceps' },
      { id: 3, muscles: 'quads' },
      { id: 4, muscles: 'glutes' },
      { id: 5, muscles: 'hamstrings' },
      { id: 6, muscles: 'upper back' },
      { id: 7, muscles: 'biceps' },
      { id: 8, muscles: 'abs' },
      { id: 9, muscles: 'lower back' },
    ];

    const setsAndRepsForExercise = [
      {
        id: 1,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 1,
      },
      {
        id: 2,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 2,
      },
      {
        id: 3,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 3,
      },
      {
        id: 4,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 4,
      },
      {
        id: 5,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 5,
      },
      {
        id: 6,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 6,
      },
      {
        id: 7,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 7,
      },
      {
        id: 8,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 8,
      },
      {
        id: 9,
        sets: 3,
        reps: [],
        effort: [],
        isExerciseTimed: false,
        exerciseId: 9,
      },
    ];

    return {
      excercises: excercises,
      muscleGroups: muscleGroups,
      setsAndRepsForExercise: setsAndRepsForExercise,
    };
  }
}
