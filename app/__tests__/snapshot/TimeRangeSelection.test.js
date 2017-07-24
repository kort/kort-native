import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../src/reducers';
import TimeRangeSelection from '../../src/components/missions/types/TimeRangeSelection';

test('renders correctly', () => {
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const tree = renderer.create(
    <Provider store={store}>
        <TimeRangeSelection
            data={[{
                fromTime: '',
                toTime: '',
                fromTimeModalVisible: false,
                toTimeModalVisible: false,
                openEnd: false
            }]}
            row={0}
            col={0}
            dataChanged 
        />    
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
