import { ArrayType } from '@angular/compiler';

export default class Exercise {
  constructor(
    public id: number,
    public name: string,
    public muscleGroups: Array<string>
  ) {}
}
