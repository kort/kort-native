import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { GoogleSignin } from 'react-native-google-signin';
import store from 'react-native-simple-store';
import { USER } from '../storage/StorageKeys';
import KortAPI from '../data/KortAPI';
import { 
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_CLEAR_ERROR_MSG,
    LOGOUT_USER,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED,
    SHOW_WEBVIEW,
    SHOW_CONFIRM_LOGOUT_MODAL
} from './types';
import Config from '../constants/Config'; 

const loginUserSuccess = (dispatch, user) => {
    console.log('user login', user);
    store.update(USER, user);

    dispatch({ 
        type: LOGIN_USER_SUCCESS,
        payload: user 
    });  

    Actions.root();
};

const loginUserFail = (dispatch, errorMsg) => {
    dispatch({
        type: LOGIN_USER_FAILED,
        payload: errorMsg
    });
};

export const loginUser = (dispatch, user, update) => {
        const apiSecure = new KortAPI(user.secret);
        apiSecure.getUserinfo(user.id)
        .then(response => {
            loginUserSuccess(dispatch, response);
            console.log('resp', response);
        })
        .catch(errorMsg => {
            if (!update) {
                loginUserFail(dispatch, errorMsg);
            }
        });
};

export const logoutUser = () => {
    store.delete(USER);
    
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

export const showConfirmModal = (show) => {
   return { 
        type: SHOW_CONFIRM_LOGOUT_MODAL,
        payload: show 
    };   
};

export const secretReceived = (dispatch, user) => {
    console.log('user received ', user);
        dispatch({
            type: SECRET_RECEIVED,
            payload: user
        });
        loginUser(dispatch, user, false);
};

export const updateUser = (user) => {
    return (dispatch) => {  
        loginUser(dispatch, user, true);
    };
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

export const loginUserSilently = (user) => {
    console.log('login user silently');
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        loginUser(dispatch, user, false);
    };
};

export const clearErrorMsg = () => {
    return {
        type: LOGIN_USER_CLEAR_ERROR_MSG,
        payload: null
    };
};
