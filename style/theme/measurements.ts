export class Measurements {
  constructor(private readonly _units: number) {}

  units(multiplier: number = 1): number {
    if (multiplier === 0 || multiplier % 1 > 0) {
      throw new Error("Must be an integer greater than zero");
    }
    return this._units * multiplier;
  }
}

const defaultMeasurements = new Measurements(4);

export type ThemeMeasurements = typeof defaultMeasurements;
export type Units = number;
export default defaultMeasurements;
