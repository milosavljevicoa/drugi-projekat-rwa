export default class SetsAndReps {
  private _maxSets: number = 6;

  constructor(
    public id: number,
    private _sets: number,
    private _reps: Array<number>,
    public efforts: Array<number>,
    public isExerciseTimed: boolean
  ) {
    this.initializeReps();
    this.initializeEfforts();
  }

  makeACopy(): SetsAndReps {
    return new SetsAndReps(
      this.id,
      this._sets,
      [...this._reps],
      [...this.efforts],
      this.isExerciseTimed
    );
  }

  initializeReps() {
    if (this._reps.length != this._sets)
      this._reps = new Array(this._sets).fill(3);
  }
  initializeEfforts() {
    if (this.efforts.length != this._sets)
      this.efforts = new Array(this._sets).fill(1);
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
    this._reps.push(1);
    this.efforts.push(0);
    this._sets++;
  }

  decrementSets(): void {
    if (this._sets === 1) return;
    this._reps.pop();
    this.efforts.pop();
    this._sets--;
  }
}
