import reducer from '../../src/reducers/AuthReducer';
import * as types from '../../src/actions/types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        loggedIn: null,
        showConfirm: false,
        loading: false,
        webviewURI: '',
        user: {},
        errorMsg: null
      }
    );
  });

it('should logout user', () => {
    expect(
      reducer([], {
        type: types.LOGOUT_USER,
        payload: null
      })
    ).toEqual(
      {
        loggedIn: false,
        showConfirm: false,
        loading: false,
        webviewURI: '',
        user: {},
        errorMsg: null    
    }
    );
});

it('should login user', () => {
    expect(
      reducer([], {
        type: types.LOGIN_USER,
        payload: null
      })
    ).toEqual(
      {
        loading: true,
        loggedIn: false  
    }
    );
});

it('should be successfull', () => {
    expect(
      reducer([], {
        type: types.LOGIN_USER_SUCCESS,
        payload: 'user'
      })
    ).toEqual(
      {
        loading: false,
        loggedIn: true,
        user: 'user'
    }
    );
});

it('should login user', () => {
    expect(
      reducer([], {
        type: types.LOGIN_USER,
        payload: null
      })
    ).toEqual(
      {
        loading: true,
        loggedIn: false  
    }
    );
});

it('should fail', () => {
    expect(
      reducer([], {
        type: types.LOGIN_USER_FAILED,
        payload: 'error'
      })
    ).toEqual(
      {
        loading: false,
        loggedIn: false,
        errorMsg: 'error'
    }
    );
});

it('should clear error msg', () => {
    expect(
      reducer([], {
        type: types.LOGIN_USER_CLEAR_ERROR_MSG,
        payload: null
      })
    ).toEqual(
      {
        errorMsg: null
    }
    );
});

it('should show webview', () => {
    expect(
      reducer([], {
        type: types.SHOW_WEBVIEW,
        payload: 'someurl'
      })
    ).toEqual(
      {
        webviewURI: 'someurl'
    }
    );
});

it('should get set loading true', () => {
    expect(
      reducer([], {
        type: types.VERIFY_GOOGLE_TOKEN_ID,
        payload: null
      })
    ).toEqual(
      {
        loggedIn: null,
        showConfirm: false,
        loading: true,
        webviewURI: '',
        user: {},
        errorMsg: null
    }
    );
});

it('should set user obj', () => {
    expect(
      reducer([], {
        type: types.SECRET_RECEIVED,
        payload: { user: 'user' }
      })
    ).toEqual(
      {
        loading: false, 
        loggedIn: false, 
        user: { user: 'user' }
    }
    );
});

it('should set confirm modal', () => {
    expect(
      reducer([], {
        type: types.SHOW_CONFIRM_LOGOUT_MODAL,
        payload: true
      })
    ).toEqual(
      {
        showConfirm: true
    }
    );
});
});
