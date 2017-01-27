import { Actions } from 'react-native-router-flux';
import KortAPI from '../data/KortAPI';
import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    MODAL_MODE,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED,
    SHOW_WEBVIEW,
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

export const modalModeChanged = (modalType) => {
    return {
        type: MODAL_MODE,
        payload: modalType
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

export const loginUser = ({ secret }) => {
    return (dispatch) => {  
        //TODO
    };
};
