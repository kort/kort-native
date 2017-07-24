import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../src/reducers';
import AchievementPopup from '../../src/components/achievements/AchievementPopup';

test('renders correctly', () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const tree = renderer.create(
        <Provider store={store}>
            <AchievementPopup
                visible
                onAccept={() => this.showNextAchievementOrClose()}
                achievement={{}}
                animateIndef
            />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
