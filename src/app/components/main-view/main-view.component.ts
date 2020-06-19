import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import Exercise from 'src/app/models/exercise.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, tap, switchMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  public exerciseToDisplay: Array<Exercise>;
  private searchedExercises: Subject<string>;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.searchedExercises = new Subject();
    this.searchedExercises
      .pipe(
        debounceTime(500),
        switchMap((exerciseName: string) =>
          this.exerciseService.getQueriedExercises$(exerciseName)
        )
      )
      .subscribe(
        (exercises: Array<Exercise>) => (this.exerciseToDisplay = exercises)
      );

    this.searchExerciseByName('');
  }

  searchExerciseByName(exerciseName: string) {
    this.searchedExercises.next(exerciseName);
  }
}
