import Exercise from './exercise.model';
import SetsAndReps from './sets-and-reps.model';

export default class ExerciseWorkout extends Exercise {
  private constructor(
    id: number,
    name: string,
    muscleGroups: Array<string>,
    public setsAndReps: SetsAndReps
  ) {
    super(id, name, muscleGroups);
  }

  makeACopy(): ExerciseWorkout {
    const setsAndReps = this.setsAndReps.makeACopy();
    return new ExerciseWorkout(
      this.id,
      this.name,
      [...this.muscleGroups],
      setsAndReps
    );
  }

  public static createExericseWorkout(
    exercise: Exercise,
    setAndReps: SetsAndReps
  ) {
    const { id, name, muscleGroups } = exercise;
    return new ExerciseWorkout(id, name, [...muscleGroups], setAndReps);
  }
}
