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
    dispatch({ 
        type: LOGIN_USER_SUCCESS,
        payload: user 
    });       
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

export const secretReceived = (dispatch, secret) => {
    console.log('sweet secret received', secret);
    if (dispatch) {
        dispatch({
            type: SECRET_RECEIVED,
            payload: secret
        });
    } else {
        Actions.root();
        return (
            {
            type: SECRET_RECEIVED,
            payload: secret
        });
    }
    Actions.root();
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
    return (dispatch) => {
    let parsedURL = url;
    if (url) {
        const urlPairs = _.chain(url)
            .replace('kortapp://', '')
            .split('?')
            .map()
            .value()
            ;
        parsedURL = urlPairs[1];
        console.log('parsed', parsedURL);
        secretReceived(dispatch, { parsedURL });
    }
    };
};

export const loginUser = ({ secret }) => {
    return (dispatch) => {  
        //TODO
    };
};
