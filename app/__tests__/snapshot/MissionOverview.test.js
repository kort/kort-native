import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../src/reducers';
import MissionsOverview from '../../src/components/missions/MissionsOverview';

jest.mock('../../src/components/missions/Map', () => 'Map');

test('renders correctly', () => {
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const tree = renderer.create(
    <Provider store={store}>
    <MissionsOverview />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
