import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../src/reducers';
import SettingsOverview from '../../src/components/settings/SettingsOverview';

test('renders correctly', () => {
  const store = createStore(reducers, {});
  const tree = renderer.create(
    <Provider store={store}>
    <SettingsOverview />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
