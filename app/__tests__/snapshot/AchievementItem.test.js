import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../src/reducers';
import AchievementItem from '../../src/components/achievements/AchievementItem';

test('renders correctly', () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const tree = renderer.create(
        <Provider store={store}>
            <AchievementItem
                achievement={{}}
            />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
