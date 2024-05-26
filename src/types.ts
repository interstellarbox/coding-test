import type { DateTime, HourNumbers, WeekdayNumbers } from 'luxon';
export { HourNumbers, WeekdayNumbers, DateTime };

export type WeekdayAndHour = {
  weekday: WeekdayNumbers;
  hour: HourNumbers;
};

export type ClinicOpeningHours = {
  name: string;
  openingHours: string[];
}[];

export type ParsedClinicOpeningHours = {
  [key in WeekdayNumbers]?: {
    [clinicName: string]: HourNumbers[];
  };
};
