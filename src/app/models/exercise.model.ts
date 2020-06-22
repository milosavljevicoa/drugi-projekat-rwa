export default class Exercise {
  constructor(
    public id: number,
    public name: string,
    public muscleGroups: Array<string>
  ) {
    this.name = this.capitalizeFirstLetterOfEveryWord(name);
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
