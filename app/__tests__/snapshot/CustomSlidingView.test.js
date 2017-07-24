import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../src/reducers';
import { CustomSlidingView } from '../../src/components/common/CustomSlidingView';

test('renders correctly', () => {
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const tree = renderer.create(
    <Provider store={store}>
        <CustomSlidingView 
            threshold={5}
            tension={50}
            friction={10}
            heights={[100, 400]}
            isOpen
            clickEvent
            lockSlider
        />    
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
