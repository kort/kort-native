import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { GoogleSignin } from 'react-native-google-signin';
import KortAPI from '../data/KortAPI';
import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED,
    SHOW_WEBVIEW
} from './types';
import Config from '../constants/Config'; 

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

export const loginUser = (dispatch, user) => {
        const apiSecure = new KortAPI(user.secret);
        apiSecure.getUserinfo(user.id)
        .then(response => {
            loginUserSuccess(dispatch, response);
            console.log('resp', response);
        })
        .catch(errorMsg => {
                console.log(errorMsg);
        });
};

export const logoutUser = () => {
    GoogleSignin.signOut()
        .then(() => { console.log('out'); })
        .catch(() => {});
    return { 
        type: LOGOUT_USER,
        payload: null 
    };  
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
            payload: user
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
            .replace(Config.DEEP_LINK_URL, '')
            .split('&')
            .map(item => { if (item) return item.split('='); return false; })
            .compact()
            .value()
            ;
        const secret = parameterPairs[0][1];
        const id = parameterPairs[1][1];
        console.log('parsed', secret, id);
        secretReceived(dispatch, { secret, id });
    }
    };
};
