import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Exercise from 'src/app/models/exercise.model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  @Output() onAddExericse: EventEmitter<Exercise> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onAddExericse.emit(this.exercise);
  }
}
