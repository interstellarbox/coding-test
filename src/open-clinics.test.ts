import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';
import { exampleClinicOpeningHours } from '../data/example-clinic-opening-hours';
import { getOpenClinics, parseClinicOpeningHours } from './open-clinics';
import type { WeekdayAndHour } from './types';

const parseResult = parseClinicOpeningHours(exampleClinicOpeningHours);

/**
 * Test helper that returns those clinics open on a
 * specific weekday and hour
 * of the day.
 * Monday is weekday === 1, and Sunday is weekday === 7.
 * Hours in 24 hours format
 */

/**
 * Takes a set of parsed clinic opening hours and returns an array containing
 * the names of those clinics which are open at the specified date and time,
 * sorted alphabetically.
 */

function getClinicsOpenAt(weekdayAndHour: WeekdayAndHour) {
  return getOpenClinics(parseResult, DateTime.fromObject(weekdayAndHour));
}

describe('getClinicsOpenAt', () => {
  it('Reports no open clinics on Sunday at 5am', () => {
    expect(getClinicsOpenAt({ weekday: 7, hour: 5 })).toEqual([]);
  });

  it('Reports only the Mayo Clinic open on Monday at 8am', () => {
    expect(getClinicsOpenAt({ weekday: 1, hour: 8 })).toEqual(['Mayo Clinic']);
  });

  it('Closing hour excludes from the open hours range', () => {
    // Auckland Cardiology works from 11am to 23pm on Sunday
    expect(getClinicsOpenAt({ weekday: 7, hour: 23 })).toEqual([]);
  });

  it('Opened clinics sorted alphabetically', () => {
    expect(getClinicsOpenAt({ weekday: 7, hour: 12 })).toEqual([
      'Angios R Us',
      'Auckland Cardiology',
      'Mayo Clinic',
      'The Heart Team',
    ]);
  });
});

describe('parseClinicOpeningHours', () => {
  it('parses periods correctly for multiple clinics', () => {
    const data = exampleClinicOpeningHours.filter(
      (clinic) =>
        clinic.name === 'The Heart Team' ||
        clinic.name === 'Auckland Cardiology',
    );
    const expectedOutput = {
      1: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [11, 23] },
      2: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [11, 23] },
      3: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [11, 23] },
      4: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [11, 23] },
      5: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [11, 23] },
      6: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [11, 2] },
      7: { 'Auckland Cardiology': [11, 23], 'The Heart Team': [12, 21] },
    };

    expect(parseClinicOpeningHours(data)).toEqual(expectedOutput);
  });

  it('parses single day period correctly', () => {
    const data = [
      {
        name: 'The Heart Team',
        openingHours: ['Wed 10am to 6pm'],
      },
    ];

    const expectedOutput = {
      3: { 'The Heart Team': [10, 18] },
    };

    expect(parseClinicOpeningHours(data)).toEqual(expectedOutput);
  });
});
