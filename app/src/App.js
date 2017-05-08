import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import I18n from 'react-native-i18n';
import Translations from './constants/i18n/Translations';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        this.configureI18n();
    }

    configureI18n() {
        I18n.fallbacks = true;
        I18n.defaultLocale = 'en';
        I18n.translations = Translations;
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
