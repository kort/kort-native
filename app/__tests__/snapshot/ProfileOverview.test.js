import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../src/reducers';
import ProfileOverview from '../../src/components/profile/ProfileOverview';

test('renders correctly', () => {
  const store = createStore(reducers, {});
  const tree = renderer.create(
    <Provider store={store}>
    <ProfileOverview />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
