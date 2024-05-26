import { describe, expect, it } from 'vitest';
import type { HourNumbers } from './types';
import { formatHours, isInHoursRange } from './utils';

describe('formatHours', () => {
  it('converts AM string time correctly', () => {
    expect(formatHours('9am')).toBe(9);
    expect(formatHours('12am')).toBe(0);
  });

  it('converts PM time correctly', () => {
    expect(formatHours('1pm')).toBe(13);
    expect(formatHours('12pm')).toBe(12);
  });
});

describe('isInHoursRange', () => {
  it('hour within working hours range', () => {
    expect(isInHoursRange(15, [9, 18])).toBeTruthy();
  });

  it('hour outside working hours rangee', () => {
    expect(isInHoursRange(8, [9, 18])).toBeFalsy();
  });

  it.each([9, 17])('hour equals of edge hours', (hour) => {
    expect(isInHoursRange(hour as HourNumbers, [9, 18])).toBeTruthy();
  });

  it('hour equals of closing hour', () => {
    expect(isInHoursRange(18, [9, 18])).toBeFalsy();
  });

  it('hour equals end of overnight range', () => {
    //Edge case when the startHour is 10pm and the lastWorkingHour is 6am
    expect(isInHoursRange(1, [22, 6])).toBeTruthy();
  });
});
