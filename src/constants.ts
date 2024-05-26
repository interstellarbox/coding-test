import { WeekdayNumbers } from './types';

export const DayMap: { [key: string]: WeekdayNumbers } = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
} as const;
