import WeekdayRepresentation from '../src/date/WeekdayRepresentation';

test('test empty weekdays', () => {
    const weekdays = [];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('');
});

test('test workdays series', () => {
    const weekdays = [0, 1, 2, 3, 4];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('Mo-Fr');
});

test('test over the weekend range', () => {
    const weekdays = [4, 5, 6, 0];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('Fr-Mo');
});

test('test two value representation', () => {
    const weekdays = [5, 6];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('Sa,Su');
});

test('test consecutive days mixed with single values', () => {
    const weekdays = [0, 1, 2, 5];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('Mo-We,Sa');
});

test('test over the weekend range mixed with single values', () => {
    const weekdays = [2, 4, 5, 6, 0];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('We,Fr-Mo');
});

test('test two consecutive day ranges', () => {
    const weekdays = [2, 3, 4, 6, 0];
    const result = WeekdayRepresentation(weekdays);
  expect(result).toBe('Mo,We-Fr,Su');
});
