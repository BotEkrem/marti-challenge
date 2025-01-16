export class Coordinate {
  constructor(
    public latitude: number,
    public longitude: number,
    public region?: string,
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.region = region;
  }
}
