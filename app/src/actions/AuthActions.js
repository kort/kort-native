import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import KortAPI from '../data/KortAPI';
import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED,
    SHOW_WEBVIEW
} from './types';

const loginUserSuccess = (dispatch, user) => {
        console.log('user login');

    dispatch({ 
        type: LOGIN_USER_SUCCESS,
        payload: user 
    });  
    Actions.root();     
};

const loginUserFail = (dispatch, errorMsg) => {
    console.log(errorMsg);
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: errorMsg
    });
};

export const showWebView = (uri) => {
   return { 
        type: SHOW_WEBVIEW,
        payload: uri 
    };   
};

export const secretReceived = (dispatch, user) => {
    console.log('user received ', user);
        dispatch({
            type: SECRET_RECEIVED,
            payload: user.secret
        });
        loginUser(dispatch, user);
};

export const verifyGoogleIdToken = (tokenId) => {
    return (dispatch) => {  
    dispatch({ type: VERIFY_GOOGLE_TOKEN_ID });
    const api = new KortAPI();
        api.verifyUser(tokenId)
            .then(response => secretReceived(dispatch, response))
            .catch(errorMsg => {
                loginUserFail(dispatch, errorMsg);
            });
    };
};

export const parseURL = (url) => {
    console.log('parse');
    console.log(url);
    return (dispatch) => {
    if (url) {
        const parameterPairs = _.chain(url)
            .replace('kortapp://payload?', '')
            .split('&')
            .map(item => { if (item) return item.split('='); return false; })
            .compact()
            .value()
            ;
        const secret = parameterPairs[0][1];
        const userId = parameterPairs[1][1];
        console.log('parsed', secret, userId);
        secretReceived(dispatch, { secret, userId });
    }
    };
};

export const loginUser = (dispatch, user) => {
        const apiSecure = new KortAPI(user.secret);
        apiSecure.getUserinfo(user.userId)
        .then(response => {
            loginUserSuccess(dispatch, user.secret);
            console.log('resp', response);
        })
        .catch(errorMsg => {
                console.log(errorMsg);
        });
};
