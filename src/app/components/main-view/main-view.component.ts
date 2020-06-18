import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import Exercise from 'src/app/models/exercise.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  public allExcercises: Array<Exercise>;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.allExcercises = new Array();
    this.exerciseService.getAllExcercises$().subscribe((exercise: Exercise) => {
      this.allExcercises.push(exercise);
    });
  }
}
