import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNumberOfExercises } from 'src/app/store/workout-routine/workout-routine.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public numberOfExercises$: Observable<number>;
  constructor(private exerciseStore: Store<AppState>) {}

  ngOnInit(): void {
    this.numberOfExercises$ = this.exerciseStore.pipe(
      select(selectNumberOfExercises)
    );
  }
}
