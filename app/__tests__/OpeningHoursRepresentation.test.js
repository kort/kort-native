import OpeningHoursRepresentation from '../src/date/OpeningHoursRepresentation';

const createTimeRange = (fromTime, toTime, openEnd) => {
    return { fromTime, toTime, openEnd };
};

test('test empty array with no days selected', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('', '', false)],
            formattedDays: '' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('');
});

test('test empty time string', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('', '', false)],
            formattedDays: 'Mo-Fr' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Mo-Fr');
});

test('test normal time range', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '12:00', false)],
            formattedDays: 'Mo-Fr' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Mo-Fr 08:00-12:00');
});

test('test normal time range', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '12:00', false)],
            formattedDays: 'Mo-Fr' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Mo-Fr 08:00-12:00');
});

test('test two normal time ranges', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '12:00', false), createTimeRange('13:00', '18:00', false)],
            formattedDays: 'Mo-Fr' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Mo-Fr 08:00-12:00,13:00-18:00');
});

test('test open hours', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '24:00', true)],
            formattedDays: 'Mo-Fr' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Mo-Fr 08:00-24:00+');
});

test('test two normal time ranges on two days', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '12:00', false), createTimeRange('13:00', '18:00', false)],
            formattedDays: 'Mo' },
            {
            timeRangeEntries: [createTimeRange('08:00', '12:00', false), createTimeRange('13:00', '18:00', false)],
            formattedDays: 'We' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Mo 08:00-12:00,13:00-18:00;We 08:00-12:00,13:00-18:00');
});

test('test 24/7', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('', '', false)],
            formattedDays: '24/7' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('24/7');
});

test('test public holidays', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '12:00', false)],
            formattedDays: 'PH' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('PH 08:00-12:00');
});

test('test public holidays with days', () => {
    const openingHoursArray = [{
            timeRangeEntries: [createTimeRange('08:00', '12:00', false)],
            formattedDays: 'Su,PH' }];
    const result = OpeningHoursRepresentation(openingHoursArray);
  expect(result).toBe('Su,PH 08:00-12:00');
});
