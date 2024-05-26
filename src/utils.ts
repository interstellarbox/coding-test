import { DateTime } from 'luxon';
import type { HourNumbers } from './types';

/**
 * Convert a given time in 12-hour string format to 24-hour number format
 *
 * @param hour - The hour to format.
 * @returns Hour in HourNumbers format
 */
export const formatHours = (time: string) => {
  return DateTime.fromFormat(time, 'ha').hour as HourNumbers;
};

/**
 * Checks if a given hour is within a specified range.
 *
 * @param hour - The hour to check.
 * @param hoursRange - Range of start and end hours.
 * @returns True if the hour is within the range, false otherwise.
 */
export const isInHoursRange = (
  hour: HourNumbers,
  hoursRange: HourNumbers[],
): boolean => {
  const [startHour, endHour] = hoursRange;
  // handle cases where lastWorkingHour is less than startHour
  // (e.g. from 10pm to 6am => from 22 to 6)
  if (startHour > endHour) {
    return hour >= startHour || hour < endHour;
  }
  return hour >= startHour && hour < endHour;
};
