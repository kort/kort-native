import OpenHoursVerifier from '../../src/date/OpenHoursVerifier';

test('test oh verifier', () => {
    const someDateString = 'Apr-Sep: Mo-Fr 09:00-13:00,14:00-18:00; Apr-Sep: Sa 10:00-13:00';
    const result = OpenHoursVerifier(someDateString);
  expect(result).toBe(true);
});

