export class Pet {
  constructor(
    public _id: string,
    public name: string,
    public age: number,
    public birthDate: Date,
    public type: string,
    public breed: string,
    public photo: string
  ) { }
}
