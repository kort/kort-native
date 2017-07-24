import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import 'isomorphic-fetch';
import reducers from '../../src/reducers';
import AchievementsOverview from '../../src/components/achievements/AchievementsOverview';

test('renders correctly', () => {
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const tree = renderer.create(
    <Provider store={store}>
    <AchievementsOverview />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
