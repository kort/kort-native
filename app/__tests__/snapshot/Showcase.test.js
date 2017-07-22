// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Showcase from '../../src/components/showcase/Showcase';

test('renders correctly', () => {
  const tree = renderer.create(
    <Showcase />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
