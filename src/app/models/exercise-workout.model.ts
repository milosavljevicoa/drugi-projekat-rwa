import Exercise from './exercise.model';

export class ExerciseWorkout extends Exercise {
  private constructor(
    id: number,
    name: string,
    muscleGroups: Array<string>,
    public setsAndReps: SetsAndReps
  ) {
    super(id, name, muscleGroups);
  }

  public static createExericseWorkout(
    exercise: Exercise,
    setAndReps: SetsAndReps
  ) {
    const { id, name, muscleGroups } = exercise;
    return new ExerciseWorkout(id, name, [...muscleGroups], setAndReps);
  }
}

export class SetsAndReps {
  private _maxSets: number = 6;

  constructor(
    public id: number,
    private _sets: number,
    private _reps: Array<number>,
    public efforts: Array<number>,
    public isExerciseTimed: boolean
  ) {
    if (this.efforts.length !== this._reps.length) {
      this.efforts = new Array(_reps.length).fill(0);
    }
  }

  get sets(): number {
    return this._sets;
  }

  get reps(): Array<number> {
    return this._reps;
  }

  incrementReps(index: number): void {
    if (this.isIndexOutOfBoundsForReps(index)) return;
    if (this._reps.length === this._maxSets) return;
    this._reps[index]++;
  }

  decrementReps(index: number): void {
    if (this.isIndexOutOfBoundsForReps(index)) return;
    if (this._reps[index] === 1) return;
    this._reps[index]--;
  }

  isIndexOutOfBoundsForReps(index: number): boolean {
    return index < 0 || index >= this.reps.length;
  }

  incrementSets(): void {
    if (this._sets === this._maxSets) return;
    this.efforts.push(0);
    this._sets++;
  }

  decrementSets(): void {
    if (this._sets === 1) return;
    this.efforts.pop();
    this._sets--;
  }
}
