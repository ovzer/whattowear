interface ISunlightTimes {
  sunrise: Date;
  sunriseEnd: Date;
  goldenHourEnd: Date;
  solarNoon: Date;
  goldenHour: Date;
  sunsetStart: Date;
  sunset: Date;
  dusk: Date;
  nauticalDusk: Date;
  night: Date;
  nadir: Date;
  nightEnd: Date;
  nauticalDawn: Date;
  dawn: Date;
}

interface ISunPosition {
  altitude: number;
  azimuth: number;
}

interface IMoonPosition {
  altitude: number;
  azimuth: number;
  distance: number;
  parallacticAngle: number;
}

interface IMoonIllumination {
  fraction: number;
  phase: number;
  angle: number;
}

interface IMoonTimes {
  rise: Date;
  set: Date;
  alwaysUp: boolean;
  alwaysDown: boolean;
}

declare module 'suncalc' {
  function getTimes(date: Date, latitude: number, longitude: number): ISunlightTimes;
  function getPosition(timeAndDate: Date, latitude: number, longitude: number): ISunPosition;
  function getMoonPosition(timeAndDate: Date, latitude: number, longitude: number): IMoonPosition;
  function getMoonIllumination(timeAndDate: Date): IMoonIllumination;
  function getMoonTimes(date: Date, latitude: number, longitude: number, inUTC?: boolean): IMoonTimes;
}
