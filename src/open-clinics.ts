import { DayMap } from './constants';
import type {
  ClinicOpeningHours,
  DateTime,
  HourNumbers,
  ParsedClinicOpeningHours,
  WeekdayNumbers,
} from './types';
import { formatHours, isInHoursRange } from './utils';

/**
 * Parses a set of clinic opening hours and returns a data structure that can be
 * queried to find which clinics are open at a specified date and time. The
 * querying is done using the getOpenClinics() function.
 *
 * Notes:
 *
 * - The format of the opening hours data to be parsed can be seen in the
 *   "data/example-clinic-opening-hours.ts" file.
 *
 * - The input data can be assumed to be correctly formatted, i.e. there is no
 *   requirement to validate it or handle any errors it may contain.
 */

export function parseClinicOpeningHours(
  clinicOpeningHours: ClinicOpeningHours,
): ParsedClinicOpeningHours {
  const parsedData: ParsedClinicOpeningHours = {};

  // Iterate over each clinic in the input data
  clinicOpeningHours.forEach((clinic) => {
    // Iterate over each opening hours string for the clinic
    clinic.openingHours.forEach((clinicOpeningHours) => {
      // Split the string into days and hours
      const [days, ...hours] = clinicOpeningHours.split(' ');

      // Convert day abbreviations to WeekdayNumbers
      const [startDay, endDay]: WeekdayNumbers[] = days
        .split('-')
        .map((day) => {
          return DayMap[day] as WeekdayNumbers;
        });

      // Convert hours range strings into HourNumbers range
      const workingHoursRange: HourNumbers[] = hours
        .filter((item) => item !== 'to')
        .map((hours) => {
          return formatHours(hours);
        });

      // Assign the working hours range to each day
      let day = startDay;
      do {
        if (!parsedData[day]) parsedData[day] = {};
        if (!parsedData[day]![clinic.name]) parsedData[day]![clinic.name] = [];
        parsedData[day]![clinic.name] = workingHoursRange;
        day++;
      } while (day <= endDay);
    });
  });
  return parsedData;
}

/**
 * Takes a set of parsed clinic opening hours and returns an array containing
 * the names of those clinics which are open at the specified date and time,
 * sorted alphabetically.
 */
export function getOpenClinics(
  parsedClinicOpeningHours: ParsedClinicOpeningHours,
  queryTime: DateTime,
) {
  // Extract weekday and hour from the DateTime object
  const weekday = queryTime.weekday as WeekdayNumbers;
  const hour = queryTime.hour as HourNumbers;
  const openClinics: string[] = [];

  // Check if there are clinics for the specified weekday
  if (parsedClinicOpeningHours[weekday]) {
    // Iterate over each clinic and its opening hours for the specified weekday
    for (const clinic in parsedClinicOpeningHours[weekday]) {
      const workingHoursRange = parsedClinicOpeningHours[weekday]![clinic];
      // Check if the specified hour is within the clinic's opening hours
      if (isInHoursRange(hour, workingHoursRange)) {
        openClinics.push(clinic);
      }
    }
  }

  return openClinics.sort();
}
