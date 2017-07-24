import CoordinateCalculations from '../../src/geolocation/CoordinateCalculations';

test('test coordinate calculation', () => {
  const result = CoordinateCalculations.calculateDistance(
                { latitude: 47.0, longitude: 8.2 }, { latitude: 47.0, longitude: 8.2 }); 
  expect(result).toBe(0);
});
